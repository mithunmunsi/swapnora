import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./ProjectDetails.css";

import Water from "../assets/water-well.jpg";
import schoolSupply from "../assets/school-supply.jpg";
import foodOrphanage from "../assets/food-orphanage.jpg";

type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  votes: number;
  budget: string;
  location: string;
  fundingMethod: string;
  executionPlan: string;
};

const mockProjects: Project[] = [
  {
    id: "p1",
    title: "Clean Water for Village",
    description: "Install 3 tube wells to provide clean water in rural areas. ",
    image: Water,
    votes: 12,
    budget: "$5,000",
    location: "Rural Bangladesh",
    fundingMethod: "Crowdfunding via RedX donors",
    executionPlan: "Local contractors will be hired to install tube wells",
  },
  {
    id: "p2",
    title: "School Supply Distribution",
    description:
      "Distribute notebooks and backpacks to underprivileged students.",
    image: schoolSupply,
    votes: 19,
    budget: "$3,000",
    location: "Dhaka Slum Area",
    fundingMethod: "Partnered NGO support and RedX fund",
    executionPlan: "Volunteers and school partnerships for distribution",
  },
  {
    id: "p3",
    title: "Food for Orphanage",
    description: "Provide meals for 1 month to a local orphanage.",
    image: foodOrphanage,
    votes: 7,
    budget: "$2,000",
    location: "Rajshahi City",
    fundingMethod: "One-time donor drive",
    executionPlan: "Bulk meal prep and scheduled delivery via RedX riders",
  },
];

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const found = mockProjects.find((p) => p.id === id);
    setProject(found || null);
  }, [id]);

  if (!project) {
    return <div className="project-details-error">Project not found.</div>;
  }

  return (
    <section className="projects-section">
      <div className="project-details">
        <div className="project-details-header">
          <h1 className="project-details-title">{project.title}</h1>
          <p className="project-details-location">📍 {project.location}</p>
        </div>
        <div className="project-details-body">
          <div className="project-details-image">
            <img src={project.image} alt={project.title} />
          </div>
          <div className="project-details-content">
            <p className="project-details-description">{project.description}</p>
            <p>
              <strong>📊 Votes:</strong> {project.votes}
            </p>
            <p>
              <strong>💵 Budget:</strong> {project.budget}
            </p>
            <p>
              <strong>💳 Funding:</strong> {project.fundingMethod}
            </p>
            <p>
              <strong>🛠️ Execution:</strong> {project.executionPlan}
            </p>
            <p>
              <strong>📊 Votes:</strong> {project.votes}
            </p>
            <p>
              <strong>💵 Budget:</strong> {project.budget}
            </p>
            <p>
              <strong>💳 Funding:</strong> {project.fundingMethod}
            </p>
            <p>
              <strong>🛠️ Execution:</strong> {project.executionPlan}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetails;
