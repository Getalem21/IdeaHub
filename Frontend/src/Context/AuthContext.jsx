import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
useEffect(() => {
  if (!token) return;
  const decoded = jwtDecode(token);
  setUser(decoded); // instantly get role/id from token
  // still fetch full profile after that
  axios.get("http://localhost:5000/users/profile", {
    headers: { Authorization: `Bearer ${token}` },
  })
  .then(res => setUser(res.data))
  .catch(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  });
}, [token]);

  // Handle login
  const login = (userData, jwt) => {
    localStorage.setItem("token", jwt);
    setToken(jwt);
    setUser(userData);
  };

  // Handle logout
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
