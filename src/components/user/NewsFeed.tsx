import { useState } from "react";
import "./NewsFeed.css"; // We'll create this CSS

interface Post {
  id: number;
  user: string;
  content: string;
  timestamp: string;
}

const NewsFeed = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      user: "Sarah",
      content:
        "We just completed the Clean Water project in Village X! Thank you donors! 💧❤️",
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      user: "Michael",
      content:
        "Need urgent donations for the Health Camp this weekend. Please support! 🙏",
      timestamp: "5 hours ago",
    },
  ]);

  const [newPost, setNewPost] = useState("");

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPost.trim() === "") return;

    const post: Post = {
      id: Date.now(),
      user: "John Doe", // later: get real logged-in user
      content: newPost,
      timestamp: "Just now",
    };

    setPosts([post, ...posts]);
    setNewPost("");
  };

  return (
    <div className="newsfeed">
      {/* Post Box */}
      <form onSubmit={handlePostSubmit} className="post-form">
        <textarea
          placeholder="What's happening?"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          className="post-textarea"
          rows={3}
        />
        <button type="submit" className="post-button">
          Post
        </button>
      </form>

      {/* Feed */}
      <div className="feed-list">
        {posts.map((post) => (
          <div key={post.id} className="feed-post">
            <div className="post-header">
              <strong>{post.user}</strong>{" "}
              <span className="timestamp">{post.timestamp}</span>
            </div>
            <p className="post-content">{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;
