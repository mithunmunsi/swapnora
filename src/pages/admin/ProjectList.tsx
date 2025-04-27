import { useState, useEffect } from "react";

interface Project {
  _id: string;
  title: string;
  description: string;
  status: "pending" | "approved" | "archived";
  votes: number;
  goalAmount: number;
}

const ProjectList = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  // Simulate fetching projects
  useEffect(() => {
    const mockProjects: Project[] = [
      {
        _id: "1",
        title: "Clean Water for Village",
        description: "Install water filters in 3 rural areas.",
        status: "pending",
        votes: 45,
        goalAmount: 5000,
      },
      {
        _id: "2",
        title: "School Supplies for Kids",
        description: "Provide books and uniforms for 100 students.",
        status: "approved",
        votes: 78,
        goalAmount: 3000,
      },
    ];
    setProjects(mockProjects);
  }, []);

  const handleStatusChange = (id: string, newStatus: Project["status"]) => {
    setProjects((prev) =>
      prev.map((p) => (p._id === id ? { ...p, status: newStatus } : p))
    );
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">📋 Manage Projects</h1>

      <table className="w-full text-left table-auto border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Title</th>
            <th className="p-3">Votes</th>
            <th className="p-3">Goal</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project._id} className="border-t">
              <td className="p-3">{project.title}</td>
              <td className="p-3">{project.votes}</td>
              <td className="p-3">${project.goalAmount}</td>
              <td className="p-3 capitalize">{project.status}</td>
              <td className="p-3 space-x-2">
                <button
                  className="px-3 py-1 bg-green-500 text-white rounded"
                  onClick={() => handleStatusChange(project._id, "approved")}
                >
                  Approve
                </button>
                <button
                  className="px-3 py-1 bg-yellow-500 text-white rounded"
                  onClick={() => handleStatusChange(project._id, "pending")}
                >
                  Pending
                </button>
                <button
                  className="px-3 py-1 bg-red-500 text-white rounded"
                  onClick={() => handleStatusChange(project._id, "archived")}
                >
                  Archive
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectList;
