import { useEffect, useState } from "react";
import api from "../../services/api";
import "./CompletedProjects.css";
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

const CompletedProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get("/projects");

      const completedProjects = response.data.projects.filter(
        (project: Project) => project.fundingStatus === "completed",
      );

      setProjects(completedProjects);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading completed projects...</p>;
  }

  return (
    <section className="completed-projects">
      <h1>Completed Projects</h1>

      <p>Explore projects that have been successfully funded and completed.</p>

      <div className="completed-grid">
        {projects.map((project) => (
          <div key={project._id} className="completed-card">
            <img
              src={project.image}
              alt={project.title}
              className="completed-image"
            />

            <div className="completed-content">
              <span className="completed-badge">✅ Completed</span>

              <h2>{project.title}</h2>

              <p>{project.description}</p>

              <div className="completed-stats">
                <span>🏷️ {project.category}</span>

                <span>🗳️ {project.totalVotes} Votes</span>
              </div>

              <div className="completed-funding">
                <strong>€{project.raisedAmount}</strong>

                <span>Goal: €{project.targetAmount}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CompletedProjects;
