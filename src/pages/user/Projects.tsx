import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import "./Project.css";
import { useAuth } from "../../hooks/useAuth";

interface Project {
  _id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  targetAmount: number;
  raisedAmount: number;
  totalVotes: number;
  fundingStatus: string;
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [credits, setCredits] = useState(0);
  const [loading, setLoading] = useState(true);
  const [votingProject, setVotingProject] = useState<string | null>(null);
  const { refreshUser } = useAuth();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [projectsRes, dashboardRes] = await Promise.all([
        api.get("/projects"),
        api.get("/users/dashboard"),
      ]);

      setProjects(projectsRes.data.projects);

      setCredits(dashboardRes.data.dashboard.votingCredits || 0);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (projectId: string, creditsUsed: number) => {
    try {
      if (credits < creditsUsed) {
        alert("You do not have enough voting credits.");
        return;
      }

      setVotingProject(projectId);

      await api.post("/votes", {
        projectId,
        creditsUsed,
      });

      await refreshUser();

      await fetchData();

      alert(
        `${creditsUsed} vote credit${
          creditsUsed > 1 ? "s" : ""
        } successfully used!`,
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);

      alert(error?.response?.data?.message || "Failed to cast vote");
    } finally {
      setVotingProject(null);
    }
  };

  if (loading) {
    return <div className="projects-loading">Loading projects...</div>;
  }

  return (
    <section className="dashboard-projects">
      <div className="projects-header">
        <div>
          <h1>🗳️ Community Voting</h1>

          <p>
            Use your voting credits to support the projects you believe should
            receive funding.
          </p>
        </div>

        <div className="credits-card">
          <h3>Available Credits</h3>

          <span>{credits}</span>
        </div>
      </div>

      <div className="projects-grid">
        {projects.map((project, index) => {
          const progress = (project.raisedAmount / project.targetAmount) * 100;

          return (
            <article key={project._id} className="project-card">
              <div className="project-rank">#{index + 1}</div>

              <img
                src={project.image}
                alt={project.title}
                className="project-image"
              />

              <div className="project-content">
                <div className="project-top">
                  <span className="project-category">{project.category}</span>

                  <span className="project-status">
                    {project.fundingStatus}
                  </span>
                </div>

                <h2>{project.title}</h2>

                <p>{project.description}</p>

                <div className="project-stats">
                  <span>🗳️ {project.totalVotes} Votes</span>

                  <span>
                    €{project.raisedAmount} / €{project.targetAmount}
                  </span>
                </div>

                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${Math.min(progress, 100)}%`,
                    }}
                  />
                </div>

                {project.fundingStatus === "voting" ? (
                  <div className="vote-actions">
                    <button
                      onClick={() => handleVote(project._id, 1)}
                      disabled={votingProject === project._id}
                    >
                      Vote 1
                    </button>

                    <button
                      onClick={() => handleVote(project._id, 5)}
                      disabled={votingProject === project._id}
                    >
                      Vote 5
                    </button>

                    <button
                      onClick={() => handleVote(project._id, 10)}
                      disabled={votingProject === project._id}
                    >
                      Vote 10
                    </button>
                  </div>
                ) : project.fundingStatus === "selected" ? (
                  <div className="project-status-label selected">
                    🏆 Selected For Funding
                  </div>
                ) : project.fundingStatus === "funding" ? (
                  <div className="project-status-label funding">
                    💰 Fundraising In Progress
                  </div>
                ) : (
                  <div className="project-status-label completed">
                    ✅ Project Completed
                  </div>
                )}
                <div className="project-links">
                  <Link
                    to={`/dashboard/projects/${project._id}`}
                    className="details-btn"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;
