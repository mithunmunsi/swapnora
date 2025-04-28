import { useState } from "react";

type Project = {
  id: string;
  title: string;
  description: string;
  votes: number;
};

const Vote = () => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "p1",
      title: "Clean Water for Village",
      description:
        "Install 3 tube wells to provide clean water in rural areas.",
      votes: 12,
    },
    {
      id: "p2",
      title: "School Supply Distribution",
      description:
        "Distribute notebooks and backpacks to underprivileged students.",
      votes: 19,
    },
    {
      id: "p3",
      title: "Food for Orphanage",
      description: "Provide meals for 1 month to a local orphanage.",
      votes: 7,
    },
  ]);

  const [votedProjectId, setVotedProjectId] = useState<string | null>(null);

  const handleVote = (projectId: string) => {
    if (votedProjectId) return; // Prevent double voting

    const updatedProjects = projects.map((project) =>
      project.id === projectId
        ? { ...project, votes: project.votes + 1 }
        : project
    );

    setProjects(updatedProjects);
    setVotedProjectId(projectId);
  };

  return (
    <section className="vote-section">
      <header className="vote-header">
        <h1 className="vote-title">🗳️ Vote for the Next Social Project</h1>
        <p className="vote-description">
          Cast your vote to decide which project our community should support
          next. The project with the most votes will be selected for funding and
          execution.
        </p>
      </header>

      <div className="projects-list">
        {projects.map((project) => (
          <article key={project.id} className="project-card">
            <header className="project-header">
              <h2 className="project-title">{project.title}</h2>
              <span className="project-votes">{project.votes} vote(s)</span>
            </header>
            <p className="project-description">{project.description}</p>
            <button
              className={`vote-button ${
                votedProjectId === project.id ? "voted" : ""
              }`}
              onClick={() => handleVote(project.id)}
              disabled={!!votedProjectId}
            >
              {votedProjectId === project.id ? "Voted" : "Vote"}
            </button>
          </article>
        ))}
      </div>

      {votedProjectId && (
        <div className="thank-you-message">
          ✅ Thank you for voting! You selected:{" "}
          <strong>
            {projects.find((p) => p.id === votedProjectId)?.title}
          </strong>
        </div>
      )}
    </section>
  );
};

export default Vote;
