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
    <div className="min-h-screen bg-gray-50 py-10 px-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        🗳️ Vote for the Next Social Project
      </h1>
      <p className="text-gray-600 mb-8 text-center max-w-2xl">
        Cast your vote to decide which project our community should support
        next. The project with the most votes will be selected for funding and
        execution.
      </p>

      <div className="grid gap-6 w-full max-w-4xl">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-all"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-indigo-700">
                {project.title}
              </h2>
              <span className="text-sm text-gray-500">
                {project.votes} vote(s)
              </span>
            </div>
            <p className="text-gray-600 mt-2">{project.description}</p>
            <button
              className={`mt-4 px-4 py-2 rounded ${
                votedProjectId === project.id
                  ? "bg-green-500 text-white cursor-default"
                  : votedProjectId
                  ? "bg-gray-300 text-white cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white"
              }`}
              onClick={() => handleVote(project.id)}
              disabled={!!votedProjectId}
            >
              {votedProjectId === project.id ? "Voted" : "Vote"}
            </button>
          </div>
        ))}
      </div>

      {votedProjectId && (
        <div className="mt-6 text-green-600 font-medium">
          ✅ Thank you for voting! You selected:{" "}
          <strong>
            {projects.find((p) => p.id === votedProjectId)?.title}
          </strong>
        </div>
      )}
    </div>
  );
};

export default Vote;
