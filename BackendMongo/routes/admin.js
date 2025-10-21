
import express from "express";
import User from "../models/User.js";
import Post from "../models/Post.js";
import { authenticateToken, isAdmin } from "../middleware/auth.js";

const router = express.Router();
/////////////////////////////////user manage/////////////////////////////////////////////////////////////////////////////////////////
router.get("/users", authenticateToken, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


router.put("/users/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


router.delete("/users/:id", authenticateToken,isAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
/////////////////////////////////////////Admin Post manage///////////////////////////////////////////////////////////////////////////////////

router.get("/posts", authenticateToken,isAdmin, async (req, res) => {
        console.log("User:", req.user);

  try {
    // Get all posts (pending + approved)
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("user_id", "username photo");
    res.json(posts);
  } catch (err) {
    console.error("Fetch posts error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


router.put("/posts/:id/approve", authenticateToken, isAdmin, async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    console.error("Approve post error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


router.delete("/posts/:id", authenticateToken, isAdmin, async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error("Delete post error:", err);
    res.status(500).json({ message: "Server error" });
  }
});




export default router;
