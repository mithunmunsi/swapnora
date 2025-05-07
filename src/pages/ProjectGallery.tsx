import { useState } from "react";
import { Link } from "react-router-dom";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  status: "Active" | "Completed";
}

const ProjectGallery = () => {
  const [projects] = useState<Project[]>([
    {
      id: "1",
      title: "Clean Water for All",
      description:
        "Providing clean drinking water to remote villages through solar-powered wells.",
      image: "/images/water-project.jpg",
      status: "Active",
    },
    {
      id: "2",
      title: "Education for Girls",
      description:
        "Sponsoring education materials and teacher support for girls in rural areas.",
      image: "/images/education-project.jpg",
      status: "Completed",
    },
    {
      id: "3",
      title: "Health Camp 2024",
      description:
        "A mobile health camp that provided free checkups and medicines to 1500+ people.",
      image: "/images/health-project.jpg",
      status: "Completed",
    },
    {
      id: "4",
      title: "Winter Clothing Drive",
      description:
        "Distributing warm clothes to refugees and low-income families during winter.",
      image: "/images/clothing-project.jpg",
      status: "Active",
    },
  ]);

  return (
    <div className="project-gallery">
      <h2>Our Projects</h2>
      <div className="projects-grid">
        {projects.map((project) => (
          <Link to={`/stories/${project.id}`} className="project-card-link">
            <div className="project-card">
              <img src={project.image} alt={project.title} />
              <div className="card-body">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <span
                  className={`status ${
                    project.status === "Active" ? "active" : "completed"
                  }`}
                >
                  {project.status}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProjectGallery;
