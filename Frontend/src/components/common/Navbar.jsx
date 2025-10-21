import React, { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);

  const toggleDropdown = () => setOpen(!open);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      {/* Left side: Logo */}
      <div className="nav-left">
        <img src="/logo192.png" alt="App Logo" className="nav-logo" />
        <h2 className="nav-title">Idea Hub</h2>
      </div>

      {/* Right side: User info or login/register */}
      <div className="nav-right">
        {user ? (
          <div className="user-section" ref={dropdownRef}>
            <div className="user-info" onClick={toggleDropdown}>
              <img
                src={
                  user.photo
                    ? `http://localhost:5000/uploads/${user.photo}`
                    : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="Profile"
                className="user-avatar"
              />
              <span className="username">{user.username}</span>
              <span className={`arrow ${open ? "open" : ""}`}>&#9662;</span>
            </div>

            {/* Dropdown content */}
            {open && (
              <div className="dropdown">
                <div className="dropdown-profile">
                  <img
                    src={
                      user.photo
                        ? `http://localhost:5000/uploads/${user.photo}`
                        : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }
                    alt="Profile"
                    className="dropdown-avatar"
                  />
                  <div>
                    <p className="name">{user.username}</p>
                    <p className="email">{user.email}</p>
                    <p className="phone">{user.phone || "No phone added"}</p>
                  </div>
                </div>
                <button onClick={logout} className="dropdown-logout">
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="auth-links">

            <Link to="/signin" className="login-link">Login</Link>
            <Link to="/signup" className="register-link">Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
