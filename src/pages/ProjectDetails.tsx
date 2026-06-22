import { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import api from "../services/api";

import "./ProjectDetails.css";

interface Project {
  _id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  targetAmount: number;
  raisedAmount: number;
  totalVotes: number;
  status: string;
  fundingStatus: string;

  createdBy?: {
    firstName: string;
    lastName: string;
    email: string;
  };

  createdAt: string;
}

const ProjectDetails = () => {
  const { id } = useParams();

  const [project, setProject] = useState<Project | null>(null);

  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [credits, setCredits] = useState(0);

  const isDashboard = location.pathname.startsWith("/dashboard");

  const fetchProject = useCallback(async () => {
    try {
      const projectRes = await api.get(`/projects/${id}`);

      setProject(projectRes.data.project);

      if (isDashboard) {
        const dashboardRes = await api.get("/users/dashboard");

        setCredits(dashboardRes.data.dashboard.votingCredits || 0);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [id, isDashboard]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  if (loading) {
    return <div className="project-details-loading">Loading project...</div>;
  }

  if (!project) {
    return <div className="project-details-error">Project not found.</div>;
  }

  const progress = (project.raisedAmount / project.targetAmount) * 100;

  const handleVote = async (creditsUsed: number) => {
    try {
      await api.post("/votes", {
        projectId: id,
        creditsUsed,
      });

      await fetchProject();

      alert("Vote successful");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="project-details-page">
      <div className="project-details-container">
        <img
          src={project.image}
          alt={project.title}
          className="project-details-image"
        />

        <div className="project-details-content">
          <div className="project-details-header">
            <span className="project-category">{project.category}</span>

            <span className="project-status">{project.fundingStatus}</span>
          </div>

          <h1>{project.title}</h1>

          <p className="project-description">{project.description}</p>

          <div className="project-stats">
            <div className="stat-card">
              <h3>🗳 Votes</h3>
              <p>{project.totalVotes}</p>
            </div>

            <div className="stat-card">
              <h3>💰 Raised</h3>
              <p>€{project.raisedAmount}</p>
            </div>

            <div className="stat-card">
              <h3>🎯 Goal</h3>
              <p>€{project.targetAmount}</p>
            </div>
          </div>

          <div className="progress-section">
            <div className="progress-info">
              <span>Funding Progress</span>

              <span>{progress.toFixed(1)}%</span>
            </div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${Math.min(progress, 100)}%`,
                }}
              />
            </div>
          </div>

          <div className="project-meta">
            <p>
              <strong>Status:</strong> {project.status}
            </p>

            <p>
              <strong>Funding Stage:</strong> {project.fundingStatus}
            </p>

            <p>
              <strong>Created:</strong>{" "}
              {new Date(project.createdAt).toLocaleDateString()}
            </p>

            {project.createdBy && (
              <p>
                <strong>Created By:</strong> {project.createdBy.firstName}{" "}
                {project.createdBy.lastName}
              </p>
            )}
          </div>

          <div className="project-actions">
            <Link
              to={isDashboard ? "/dashboard/projects" : "/projects"}
              className="back-btn"
            >
              ← Back to Projects
            </Link>

            {isDashboard ? (
              <>
                <div className="available-credits">
                  <span>Available Credits</span>

                  <strong>{credits}</strong>
                </div>

                <div className="vote-actions-details">
                  <button onClick={() => handleVote(1)}>Vote 1</button>

                  <button onClick={() => handleVote(5)}>Vote 5</button>

                  <button onClick={() => handleVote(10)}>Vote 10</button>
                </div>
              </>
            ) : (
              <Link to="/login" className="vote-btn">
                Login to Vote
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetails;
