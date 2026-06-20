import { useEffect, useState } from "react";
import api from "../../services/api";
import "./NewsFeed.css";

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

const NewsFeed = () => {
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  const featuredPost = posts.find((post) => post.featured);

  const regularPosts = posts.filter((post) => !post.featured);

  const filteredPosts = regularPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      activeCategory === "all" ? true : post.type === activeCategory;

    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await api.get("/news-feed");

      setPosts(response.data.posts);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="news-loading">Loading news...</p>;
  }

  return (
    <section className="news-feed">
      <h1>Community News Feed</h1>
      <div className="news-search">
        <input
          type="text"
          placeholder="Search news..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="news-filters">
        <button
          className={activeCategory === "all" ? "active" : ""}
          onClick={() => setActiveCategory("all")}
        >
          All
        </button>

        <button
          className={activeCategory === "announcement" ? "active" : ""}
          onClick={() => setActiveCategory("announcement")}
        >
          Announcements
        </button>

        <button
          className={activeCategory === "project" ? "active" : ""}
          onClick={() => setActiveCategory("project")}
        >
          Projects
        </button>

        <button
          className={activeCategory === "funding" ? "active" : ""}
          onClick={() => setActiveCategory("funding")}
        >
          Funding
        </button>

        <button
          className={activeCategory === "milestone" ? "active" : ""}
          onClick={() => setActiveCategory("milestone")}
        >
          Milestones
        </button>
      </div>

      {featuredPost && (
        <div className="featured-news">
          {featuredPost.image && (
            <img
              src={featuredPost.image}
              alt={featuredPost.title}
              className="featured-news-image"
            />
          )}

          <div className="featured-news-content">
            <span className="featured-badge">⭐ Featured Story</span>

            <h2>{featuredPost.title}</h2>

            <p>{featuredPost.content}</p>

            {featuredPost.project && (
              <div className="news-project-link">
                📌 {featuredPost.project.title}
              </div>
            )}

            <small>
              {new Date(featuredPost.createdAt).toLocaleDateString()}
            </small>
          </div>
        </div>
      )}

      <div className="news-feed-list">
        {filteredPosts.map((post) => (
          <article key={post._id} className="news-post">
            {post.image && (
              <img src={post.image} alt={post.title} className="news-image" />
            )}

            <div className="news-content">
              <span className={`news-type ${post.type}`}>{post.type}</span>

              <h2>{post.title}</h2>

              <p>{post.content}</p>

              {post.project && (
                <div className="news-project-link">📌 {post.project.title}</div>
              )}

              <small className="news-date">
                {new Date(post.createdAt).toLocaleDateString()}
              </small>
            </div>
          </article>
        ))}
        {filteredPosts.length === 0 && (
          <div className="no-news">No news found.</div>
        )}
      </div>
    </section>
  );
};

export default NewsFeed;
