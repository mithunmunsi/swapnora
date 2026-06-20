import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "./Projects.css";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get("/projects");

      const sortedProjects = response.data.projects.sort(
        (a: Project, b: Project) => b.totalVotes - a.totalVotes,
      );

      setProjects(sortedProjects);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="projects-page">
        <div className="projects-loading">Loading projects...</div>
      </section>
    );
  }

  return (
    <section className="projects-page">
      <header className="projects-header">
        <h1>🏆 Community Projects</h1>

        <p>
          Explore community-driven projects and see which initiatives are
          receiving the most support from our voters.
        </p>
      </header>

      <div className="login-notice">
        <h3>Want to Vote?</h3>

        <p>
          Sign in and use your voting credits to support projects you believe
          should receive funding.
        </p>

        <Link to="/login" className="login-btn">
          Login to Vote
        </Link>
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

                <div className="project-actions">
                  <Link to={`/projects/${project._id}`} className="details-btn">
                    View Details
                  </Link>

                  <Link to="/login" className="vote-btn-disabled">
                    Login to Vote
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
