import { useEffect, useState } from "react";
import "./AdminProjects.css";
import api from "../../services/api";

import { Project } from "../../types/project";

const AdminProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const [deletingProject, setDeletingProject] = useState<Project | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    targetAmount: "",
    image: "",
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get("/projects");

      setProjects(response.data.projects);
    } catch (error) {
      console.error(error);

      setError("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post("/projects", {
        title: formData.title,

        description: formData.description,

        category: formData.category,

        targetAmount: Number(formData.targetAmount),

        image: formData.image,
      });

      setShowCreateForm(false);

      setFormData({
        title: "",
        description: "",
        category: "",
        targetAmount: "",
        image: "",
      });

      fetchProjects();
    } catch (error) {
      console.error(error);

      alert("Failed to create project");
    }
  };

  const handleUpdateProject = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingProject) return;

    try {
      await api.put(`/projects/${editingProject._id}`, {
        title: editingProject.title,
        description: editingProject.description,
        category: editingProject.category,
        targetAmount: editingProject.targetAmount,
        image: editingProject.image,
        status: editingProject.status,
        fundingStatus: editingProject.fundingStatus,
      });

      setEditingProject(null);

      fetchProjects();
    } catch (error) {
      console.error(error);

      alert("Failed to update project");
    }
  };

  const handleDeleteProject = async () => {
    if (!deletingProject) return;

    try {
      await api.delete(`/projects/${deletingProject._id}`);

      setDeletingProject(null);

      fetchProjects();
    } catch (error) {
      console.error(error);

      alert("Failed to delete project");
    }
  };

  if (loading) {
    return <h2>Loading projects...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div className="admin-projects">
      <div className="admin-page-header">
        <h1>📋 Projects Management</h1>

        <button
          className="btn btn-primary"
          onClick={() => setShowCreateForm(true)}
        >
          + Create Project
        </button>
      </div>

      {showCreateForm && (
        <div className="create-project-modal">
          <form className="create-project-form" onSubmit={handleCreateProject}>
            <h2>Create New Project</h2>

            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  title: e.target.value,
                })
              }
              required
            />

            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
              required
            />

            <input
              type="text"
              placeholder="Category"
              value={formData.category}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  category: e.target.value,
                })
              }
              required
            />

            <input
              type="number"
              placeholder="Target Amount"
              value={formData.targetAmount}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  targetAmount: e.target.value,
                })
              }
              required
            />

            <input
              type="text"
              placeholder="Image URL"
              value={formData.image}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  image: e.target.value,
                })
              }
            />

            <div className="modal-actions">
              <button type="submit">Create</button>

              <button type="button" onClick={() => setShowCreateForm(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {editingProject && (
        <div className="create-project-modal">
          <form className="create-project-form" onSubmit={handleUpdateProject}>
            <h2>Edit Project</h2>

            <input
              type="text"
              value={editingProject.title}
              onChange={(e) =>
                setEditingProject({
                  ...editingProject,
                  title: e.target.value,
                })
              }
            />

            <textarea
              value={editingProject.description}
              onChange={(e) =>
                setEditingProject({
                  ...editingProject,
                  description: e.target.value,
                })
              }
            />

            <input
              type="text"
              value={editingProject.category}
              onChange={(e) =>
                setEditingProject({
                  ...editingProject,
                  category: e.target.value,
                })
              }
            />

            <input
              type="number"
              value={editingProject.targetAmount}
              onChange={(e) =>
                setEditingProject({
                  ...editingProject,
                  targetAmount: Number(e.target.value),
                })
              }
            />

            <input
              type="text"
              value={editingProject.image}
              onChange={(e) =>
                setEditingProject({
                  ...editingProject,
                  image: e.target.value,
                })
              }
            />

            <select
              value={editingProject.status}
              onChange={(e) =>
                setEditingProject({
                  ...editingProject,
                  status: e.target.value,
                })
              }
            >
              <option value="draft">Draft</option>

              <option value="active">Active</option>

              <option value="completed">Completed</option>

              <option value="cancelled">Cancelled</option>
            </select>

            <select
              value={editingProject.fundingStatus}
              onChange={(e) =>
                setEditingProject({
                  ...editingProject,
                  fundingStatus: e.target.value,
                })
              }
            >
              <option value="voting">Voting</option>

              <option value="selected">Selected</option>

              <option value="funding">Funding</option>

              <option value="completed">Completed</option>
            </select>

            <div className="modal-actions">
              <button type="submit">Update</button>

              <button type="button" onClick={() => setEditingProject(null)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {deletingProject && (
        <div className="delete-modal">
          <div className="delete-modal-content">
            <h3>Delete Project</h3>

            <p>
              Are you sure you want to delete
              <strong> {deletingProject.title}</strong>?
            </p>

            <div className="modal-actions">
              <button className="btn-delete" onClick={handleDeleteProject}>
                Delete
              </button>

              <button onClick={() => setDeletingProject(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      <table className="projects-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Category</th>
            <th>Target</th>
            <th>Raised</th>
            <th>Votes</th>
            <th>Funding</th>
            <th>Created By</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {projects.map((project) => (
            <tr key={project._id}>
              <td>
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-thumbnail"
                />
              </td>

              <td>{project.title}</td>

              <td>{project.category}</td>

              <td>€{project.targetAmount}</td>

              <td>€{project.raisedAmount}</td>

              <td>{project.totalVotes}</td>

              <td>
                <span
                  className={`funding-status funding-${project.fundingStatus}`}
                >
                  {project.fundingStatus}
                </span>
              </td>

              <td>
                {project.createdBy.firstName} {project.createdBy.lastName}
              </td>

              <td>
                <button
                  className="btn-edit"
                  onClick={() => setEditingProject(project)}
                >
                  Edit
                </button>

                <button
                  className="btn-delete"
                  onClick={() => setDeletingProject(project)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProjects;
