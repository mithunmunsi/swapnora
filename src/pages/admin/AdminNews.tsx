import { useEffect, useState } from "react";
import api from "../../services/api";
import "./AdminNews.css";
interface Project {
  _id: string;
  title: string;
}

interface NewsPost {
  _id: string;
  title: string;
  content: string;
  image?: string;
  type: string;
  createdAt: string;
  featured?: boolean;

  project?: {
    _id: string;
    title: string;
  };
}

const AdminNews = () => {
  const [posts, setPosts] = useState<NewsPost[]>([]);

  const [projects, setProjects] = useState<Project[]>([]);

  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
    type: "announcement",
    project: "",
    featured: false,
  });

  useEffect(() => {
    fetchPosts();
    fetchProjects();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await api.get("/news-feed");

      setPosts(response.data.posts);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await api.get("/projects");

      setProjects(response.data.projects);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.put(`/news-feed/${editingId}`, formData);
      } else {
        await api.post("/news-feed", formData);
      }

      setFormData({
        title: "",
        content: "",
        image: "",
        type: "announcement",
        project: "",
        featured: false,
      });

      setEditingId(null);

      fetchPosts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this news post?",
    );

    if (!confirmed) return;

    try {
      await api.delete(`/news-feed/${id}`);

      fetchPosts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (post: NewsPost) => {
    setEditingId(post._id);

    setFormData({
      title: post.title,
      content: post.content,
      image: post.image || "",
      type: post.type,
      project: post.project?._id || "",
      featured: post.featured || false,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const data = new FormData();

    data.append("image", file);

    try {
      const response = await api.post("/news-feed/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setFormData({
        ...formData,
        image: response.data.imageUrl,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const milestoneTemplates = [
    {
      title: "🏆 Project Selected",
      content:
        "This project has won community voting and has been selected for fundraising.",
    },
    {
      title: "💰 Fundraising Started",
      content: "This project is now accepting donations from supporters.",
    },
    {
      title: "🎯 50% Goal Reached",
      content: "This project has reached 50% of its fundraising goal.",
    },
    {
      title: "🎉 Funding Goal Reached",
      content: "This project has successfully reached its funding target.",
    },
    {
      title: "✅ Project Completed",
      content: "This project has been successfully completed and delivered.",
    },
  ];

  return (
    <section className="admin-news">
      <h1>News Management</h1>

      <form onSubmit={handleSubmit} className="news-form">
        <input
          type="text"
          placeholder="News Title"
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
          placeholder="News Content"
          rows={5}
          value={formData.content}
          onChange={(e) =>
            setFormData({
              ...formData,
              content: e.target.value,
            })
          }
          required
        />

        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {formData.image && (
          <img src={formData.image} alt="Preview" className="image-preview" />
        )}

        <select
          value={formData.type}
          onChange={(e) =>
            setFormData({
              ...formData,
              type: e.target.value,
            })
          }
        >
          <option value="announcement">Announcement</option>

          <option value="project">Project Update</option>

          <option value="funding">Funding Update</option>

          <option value="milestone">Project Milestone</option>
        </select>
        {formData.type === "milestone" && (
          <div className="milestone-templates">
            {milestoneTemplates.map((template, index) => (
              <button
                key={index}
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    title: template.title,
                    content: template.content,
                  })
                }
              >
                {template.title}
              </button>
            ))}
          </div>
        )}

        <select
          value={formData.project}
          onChange={(e) =>
            setFormData({
              ...formData,
              project: e.target.value,
            })
          }
        >
          <option value="">No Related Project</option>

          {projects.map((project) => (
            <option key={project._id} value={project._id}>
              {project.title}
            </option>
          ))}
        </select>
        <div className="featured-checkbox">
          <input
            type="checkbox"
            id="featured"
            checked={formData.featured}
            onChange={(e) =>
              setFormData({
                ...formData,
                featured: e.target.checked,
              })
            }
          />

          <label htmlFor="featured">Featured News</label>
        </div>

        <button type="submit">
          {editingId ? "Update News" : "Publish News"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);

              setFormData({
                title: "",
                content: "",
                image: "",
                type: "announcement",
                project: "",
                featured: false,
              });
            }}
          >
            Cancel Editing
          </button>
        )}
      </form>

      <div className="news-list">
        {posts.map((post) => (
          <div key={post._id} className="news-card">
            {post.image && (
              <img
                src={post.image}
                alt={post.title}
                className="news-card-image"
              />
            )}

            <div className="news-card-content">
              <span className={`news-type ${post.type}`}>{post.type}</span>

              <h3>{post.title}</h3>

              <p>{post.content}</p>

              {post.project && (
                <small>
                  Related Project: <strong>{post.project.title}</strong>
                </small>
              )}

              <div className="news-meta">
                Published on {new Date(post.createdAt).toLocaleDateString()}
              </div>

              <div className="news-actions">
                <button onClick={() => handleEdit(post)} className="edit-btn">
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(post._id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AdminNews;
