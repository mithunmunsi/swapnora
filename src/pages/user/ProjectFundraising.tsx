import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProjectDonationForm from "../../components/donation/ProjectDonationForm";
import api from "../../services/api";

import "./ProjectFundraising.css";

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

const ProjectFundraising = () => {
  const { projectId } = useParams();

  const [project, setProject] = useState<Project | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProject();
  }, [projectId]);

  const fetchProject = async () => {
    try {
      const response = await api.get(`/projects/${projectId}`);

      setProject(response.data.project);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="fundraising-loading">Loading project...</div>;
  }

  if (!project) {
    return <div className="fundraising-error">Project not found</div>;
  }

  const progress = (project.raisedAmount / project.targetAmount) * 100;

  return (
    <section className="project-fundraising">
      <div className="fundraising-card">
        <img
          src={project.image}
          alt={project.title}
          className="fundraising-image"
        />

        <div className="fundraising-content">
          <span className="fundraising-category">{project.category}</span>

          <h1>{project.title}</h1>

          <p>{project.description}</p>

          <div className="fundraising-stats">
            <div>
              <strong>€{project.raisedAmount}</strong>

              <span>Raised</span>
            </div>

            <div>
              <strong>€{project.targetAmount}</strong>

              <span>Goal</span>
            </div>

            <div>
              <strong>{project.totalVotes}</strong>

              <span>Votes</span>
            </div>
          </div>

          <div className="fundraising-progress">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${Math.min(progress, 100)}%`,
                }}
              />
            </div>

            <span>{progress.toFixed(1)}% Funded</span>
          </div>

          <div className="fundraising-info">
            <ProjectDonationForm projectId={project._id} />
            <p>
              Support this project directly and help us reach the funding goal.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectFundraising;
