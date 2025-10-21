import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./Dashboard.css";
import Navbar from "../common/Navbar";
import { AuthContext } from "../../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState({});
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();

  // Fetch posts with comments
  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/posts");
      setPosts(res.data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Handle comment input change
  const handleCommentChange = (postId, value) => {
    setComment((prev) => ({ ...prev, [postId]: value }));
  };

  // Submit comment
  const handleSubmit = async (postId) => {
    const text = comment[postId];

    if (!user) {
      navigate("/signin");
      return;
    }

    if (!text || !text.trim()) {
      alert("Comment is required");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      await axios.post(
        `http://localhost:5000/posts/${postId}/comments`,
        { text },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Clear input after submitting
      setComment((prev) => ({ ...prev, [postId]: "" }));
      fetchPosts(); // Refresh posts to show new comment
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  return (
    <div className="dashboard-page">
     
      <div className="dashboard-content">
        <h2 className="dashboard-title">Community Ideas</h2>
        <div className="posts-container">
          <Link to="/post" className="post-idea-link">
            Post Your Idea
          </Link>
        </div>

        {posts.length === 0 ? (
          <p className="no-posts">No posts available yet.</p>
        ) : (
          <div className="posts-section">
            {posts.map((post) => (
              <div key={post._id} className="post-card">
                <h3>{post.title}</h3>
                <p>{post.description}</p>

                {post.image && (
                  <img
                    src={`http://localhost:5000/uploads/${post.image}`}
                    alt={post.title}
                    className="post-image"
                  />
                )}

                <p className="post-author">
                  Posted by: {post.user_id?.username}
                  {post.user_id?.photo && (
                    <img
                      src={`http://localhost:5000/uploads/${post.user_id.photo}`}
                      alt={post.user_id.username}
                      className="author-photo"
                    />
                  )}
                </p>

                {/* Comment input */}
                <div className="comment-form">
                  <label>Add a Comment:</label>
                  <input
                    type="text"
                    placeholder="Write a comment..."
                    className="comment-input"
                    value={comment[post._id] || ""}
                    onChange={(e) =>
                      handleCommentChange(post._id, e.target.value)
                    }
                  />
                  <button
                    onClick={() => handleSubmit(post._id)}
                    className="comment-button"
                  >
                    Comment
                  </button>
                </div>

                {/* Display comments */}
                <div className="comments-section">
                  {post.comments.map((c) => (
                    <div key={c._id} className="comment-item">
                      {c.user_id?.photo && (
                        <img
                          src={`http://localhost:5000/uploads/${c.user_id.photo}`}
                          alt={c.user_id?.username}
                          className="commenter-photo"
                        />
                      )}
                      <p>
                        <strong>{c.user_id?.username}</strong>: {c.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
