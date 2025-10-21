import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";

function AdminPostManage() {
  const { token , user} = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    if (!user || user.role !== "admin") {
      console.error("Access denied. Admins only.");
      return;
    } 
    try {
      const res = await axios.get("http://localhost:5000/admin/posts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Approve a post
  const approvePost = async (id) => {
    try {
      await axios.put(`http://localhost:5000/admin/posts/${id}/approve`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

  // Reject / Delete a post
  const deletePost = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await axios.delete(`http://localhost:5000/admin/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Post Management</h1>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Author</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post._id}>
              <td>{post.title}</td>
              <td>{post.description}</td>
              <td>{post.user_id?.username}</td>
              <td>{post.status}</td>
              <td>
                {post.status === "pending" && (
                  <button onClick={() => approvePost(post._id)} style={{ marginRight: 5 }}>
                    Approve
                  </button>
                )}
                <button onClick={() => deletePost(post._id)} style={{ color: "red" }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPostManage;
