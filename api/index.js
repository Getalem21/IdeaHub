import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import usersRoutes from "../routes/users.js";
import postsRoutes from "../routes/posts.js";
import adminRoutes from "../routes/admin.js";
import chatsRoutes from "../routes/chats.js";

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use("/api/uploads", express.static("uploads"));

// MongoDB connection (prevent multiple connections)
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  isConnected = true;
  console.log("MongoDB connected");
};

// connect before routes
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// routes
app.use("/api/users", usersRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/chats", chatsRoutes);

export default app;