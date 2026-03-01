import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Profile.css"; 
import { Link ,Navigate} from "react-router-dom";  

function Profile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null); // clearer name

  useEffect(() => {
    if (!id) return;

    axios
      .get(`http://localhost:5000/users/profile/${id}`)
      .then(res => setProfile(res.data))
      .catch(err => console.error("Profile fetch error:", err.response?.data || err.message));
  }, [id]);

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div className="user-profile">
      {/* User info */}
      {profile.user && (
        <div className="userprofile">
          <img
            src={`http://localhost:5000/uploads/${profile.user.photo}`}
            alt={profile.user.username}
            className="profile-photo"
          />
          <h2>{profile.user.username}</h2>
          <p>Email: {profile.user.email}</p>
          <p>Phone: {profile.user.phone}</p>
         <Link to={`/chat/${profile.user._id}`} >chat</Link>
        </div>
      )}

      {/* User posts */}
      {profile.posts && profile.posts.length > 0 ? (
        <div className="user-posts">
          <h3>{profile.user.username}'s Posts</h3>
          {profile.posts.map((post) => (
            <div key={post._id} className="post-card">
              <h4>{post.title}</h4>
              <p>{post.description}</p>
              {post.image && (
                <img
                  src={`http://localhost:5000/uploads/${post.image}`}
                  alt={post.title}
                  className="post-image"
                />
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No posts yet</p>
      )}
    </div>
  );
}

export default Profile;
