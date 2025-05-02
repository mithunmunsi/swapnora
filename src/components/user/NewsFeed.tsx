import { useState, useEffect } from "react";
import "./NewsFeed.css";

interface Comment {
  id: number;
  user: string;
  content: string;
  timestamp: string;
}

interface Post {
  id: number;
  user: string;
  content: string;
  timestamp: string;
  likes: number;
  liked: boolean;
  views: number;
  shares: number;
  comments: Comment[];
}

const NewsFeed = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      user: "Sarah",
      content: "We just completed the Clean Water project in Village X! 💧❤️",
      timestamp: "2 hours ago",
      likes: 5,
      liked: false,
      views: 120,
      shares: 3,
      comments: [],
    },
    {
      id: 2,
      user: "Michael",
      content: "Need urgent donations for the Health Camp this weekend 🙏",
      timestamp: "5 hours ago",
      likes: 2,
      liked: false,
      views: 90,
      shares: 1,
      comments: [],
    },
  ]);

  const [newPost, setNewPost] = useState("");

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPost.trim() === "") return;

    const post: Post = {
      id: Date.now(),
      user: "John Doe",
      content: newPost,
      timestamp: "Just now",
      likes: 0,
      liked: false,
      views: 0,
      shares: 0,
      comments: [],
    };

    setPosts([post, ...posts]);
    setNewPost("");
  };

  const toggleLike = (id: number) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const handleAddComment = (id: number, commentText: string) => {
    if (!commentText.trim()) return;
    const newComment: Comment = {
      id: Date.now(),
      user: "John Doe",
      content: commentText,
      timestamp: "Just now",
    };

    setPosts((prev) =>
      prev.map((post) =>
        post.id === id
          ? {
              ...post,
              comments: [newComment, ...post.comments],
            }
          : post
      )
    );
  };

  const handleShare = (id: number) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id ? { ...post, shares: post.shares + 1 } : post
      )
    );
    alert("Post shared!");
  };

  useEffect(() => {
    // Simulate view count increase on load
    setPosts((prev) =>
      prev.map((post) => ({
        ...post,
        views: post.views + 1,
      }))
    );
  }, []);

  return (
    <div className="newsfeed">
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

      <div className="feed-list">
        {posts.map((post) => (
          <div key={post.id} className="feed-post">
            <div className="post-header">
              <strong>{post.user}</strong>{" "}
              <span className="timestamp">{post.timestamp}</span>
            </div>
            <p className="post-content">{post.content}</p>

            <div className="post-actions">
              <button onClick={() => toggleLike(post.id)}>
                {post.liked ? "❤️ Unlike" : "🤍 Like"} ({post.likes})
              </button>
              <button onClick={() => handleShare(post.id)}>
                🔄 Share ({post.shares})
              </button>
              <span>👁️ {post.views}</span>
            </div>

            <CommentSection
              comments={post.comments}
              onAddComment={(text) => handleAddComment(post.id, text)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const CommentSection = ({
  comments,
  onAddComment,
}: {
  comments: Comment[];
  onAddComment: (text: string) => void;
}) => {
  const [commentText, setCommentText] = useState("");

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddComment(commentText);
    setCommentText("");
  };

  return (
    <div className="comment-section">
      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          placeholder="Write a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="comment-input"
        />
      </form>
      {comments.map((comment) => (
        <div key={comment.id} className="comment">
          <strong>{comment.user}:</strong> {comment.content}{" "}
          <span className="timestamp">{comment.timestamp}</span>
        </div>
      ))}
    </div>
  );
};

export default NewsFeed;
