import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import "./Post.css";
import { useNavigate } from "react-router-dom";



function Post() {
  const { token,user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [imageFile, setImageFile] = useState(null);


  const handlePostSubmit = async () => {
   
    if (!title.trim() || !postContent.trim()) {
      alert("Title and description are required");
      return;
      
    }
     if(!token || !user){
      navigate('/signin');
    }
    try {
      
      const formData = new FormData();
      formData.append("userId", user.id);
      formData.append("title", title);
      formData.append("description", postContent);
      if (imageFile) formData.append("image", imageFile);

        await axios.post("http://localhost:5000/posts", formData, {

          headers: {
             "Authorization": `Bearer ${token}`,
           },
            });

      setTitle("");
      setPostContent("");
      setImageFile(null);
      navigate("/");  

      alert("Post submitted successfully!");
    } catch (err) {
      console.error("Error posting content:", err);
    }
  };

  return (
    <div className="dashboard-content">
      <div className="post-idea-card">
        <h3>Post Your Idea</h3>
        <input
          type="text"
          placeholder="Add Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="title-input"
        />
        <textarea
          rows={4}
          placeholder="Share your idea..."
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          className="idea-textarea"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="title-input"
        />
        <button className="post-btn" onClick={handlePostSubmit}>
          Post Idea
        </button>
      </div>
    </div>
  );
}

export default Post;
