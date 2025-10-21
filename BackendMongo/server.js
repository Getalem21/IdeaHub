import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import usersRoutes from "./routes/users.js";
import postsRoutes from "./routes/posts.js";
import dotenv from "dotenv";
import adminRoutes from "./routes/admin.js";
dotenv.config();
import './config/db.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // ✅ important!

// Routes
app.use("/users", usersRoutes);
app.use("/posts", postsRoutes);
app.use("/admin", adminRoutes);


app.listen(5000, () => console.log("🚀 Server running on port 5000"));
