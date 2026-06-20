import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import api from "../services/api";

import Profile1 from "../assets/profile.png";
import Profile2 from "../assets/woman.png";

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
  createdAt: string;
}

const FeaturedProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get("/projects");

      const activeProjects = response.data.projects.filter(
        (project: Project) =>
          project.fundingStatus === "selected" ||
          project.fundingStatus === "funding",
      );

      setProjects(activeProjects);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="featured-section">
        <div className="featured-container">
          <h2>Loading projects...</h2>
        </div>
      </section>
    );
  }

  return (
    <section
      className="featured-section"
      role="region"
      aria-label="Featured donation projects"
    >
      <div className="featured-container">
        {/* Header */}

        <motion.div
          className="featured-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="featured-tag">Featured Projects</div>

          <h2 className="featured-title">Support Community Projects</h2>
        </motion.div>

        {/* Projects */}

        <div className="featured-grid">
          {projects.map((project, idx) => {
            const progress = Math.min(
              (project.raisedAmount / project.targetAmount) * 100,
              100,
            );

            return (
              <motion.div
                key={project._id}
                className="featured-item"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: idx * 0.1,
                }}
                viewport={{ once: true }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="featured-image"
                  loading="lazy"
                />

                <div className="featured-content">
                  <span className="project-category">{project.category}</span>

                  <h3 className="featured-item-title">{project.title}</h3>

                  <p className="featured-item-description">
                    {project.description.length > 120
                      ? `${project.description.substring(0, 120)}...`
                      : project.description}
                  </p>

                  <div className="featured-divider"></div>

                  <div className="featured-stats">
                    <p className="featured-amount">
                      €{project.raisedAmount.toLocaleString()}
                    </p>

                    <p className="featured-goal">
                      Goal €{project.targetAmount.toLocaleString()}
                    </p>
                  </div>

                  <div className="featured-progress-bar">
                    <div
                      className="featured-progress"
                      style={{
                        width: `${progress}%`,
                      }}
                    />
                  </div>

                  <div className="featured-profiles">
                    <div className="profile-images">
                      <img
                        src={Profile1}
                        alt="Supporter"
                        className="profile-image"
                      />

                      <img
                        src={Profile2}
                        alt="Supporter"
                        className="profile-image"
                      />
                    </div>

                    <div className="profile-names">
                      <span>{project.totalVotes} Community Votes</span>
                    </div>

                    <div className="donate-button-container">
                      <Link
                        to={`/dashboard/fundraising/${project._id}`}
                        className="donate-link"
                      >
                        Donate
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
