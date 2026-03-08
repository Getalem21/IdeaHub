import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";  // only import once

import usersRoutes from "./routes/users.js";
import postsRoutes from "./routes/posts.js";
import adminRoutes from "./routes/admin.js";
import chatsRoutes from "./routes/chats.js";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/users", usersRoutes);
app.use("/posts", postsRoutes);
app.use("/admin", adminRoutes);
app.use("/chats", chatsRoutes);

// For local development only
// app.listen(5000, () => console.log("🚀 Server running on port 5000"));

export default app; // for Vercel serverless