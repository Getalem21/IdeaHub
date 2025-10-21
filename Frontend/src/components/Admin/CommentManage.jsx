import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";

function CommentManage() {
  const { token , user} = useContext(AuthContext);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    if (!user || user.role !== "admin") {
      console.error("Access denied. Admins only.");
      return;
    } 
    try {
      const res = await axios.get("http://localhost:5000/admin/comments", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComments(res.data);
    } catch (err) {
      console.error(err);
    }
  };


  // Reject / Delete a post
  const deleteComments = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await axios.delete(`http://localhost:5000/admin/comments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchComments();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Comments Management</h1>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>auther</th>
            <th>comment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment) => (
            <tr key={comment._id}>
    
              <td>{comment.user_id?.username}</td>
              <td>{comment.text}</td>
              <td>
            
                <button onClick={() => deleteComments(comment._id)} style={{ color: "red" }}>
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

export default CommentManage;
