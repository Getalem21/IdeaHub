import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import "./Signup.css";  

const SignUp = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    photo: null,
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setForm({ ...form, photo: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const formData = new FormData();
      formData.append("username", form.username);
      formData.append("email", form.email);
      formData.append("password", form.password);
      formData.append("phone", form.phone);
      if (form.photo) formData.append("photo", form.photo);
  

      await axios.post("http://localhost:5000/users/signup", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/signin");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Sign Up</h2>
        {error && <p className="error-msg">{error}</p>}

        <form className="signup-form" onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            type="text"
            name="username"
            placeholder="Full Name"
            value={form.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
        <input
            type="tel"
             name="phone"
             placeholder="Phone        Number"
             value={form.phone}
             onChange={handleChange}
             pattern="^[0-9+\s\-]{7,15}$"
             required
                     />

             
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleChange}
          />
          <button type="submit">Sign Up</button>
        </form>

        <p>
          Already have an account? <Link to="/signin">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
