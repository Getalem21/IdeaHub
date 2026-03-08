import express from "express";
import multer from "multer";
import { authenticateToken } from "../middleware/auth.js";
import Post from "../models/Post.js";
import Comments from "../models/Comments.js";


const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

/* ----------------------------- Get all posts ----------------------------- */
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({ status: "approved" })
      .sort({ createdAt: -1 })
      .populate("user_id", "username photo");

    const postsWithComments = await Promise.all(posts.map(async (post) => {
      const comments = await Comments.find({ post_id: post._id }).populate("user_id", "username photo");
      return { ...post.toObject(), comments };
    }));

    res.json(postsWithComments);
  } catch (err) {
    console.error("Fetch posts error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ----------------------------- Create a new post ----------------------------- */
router.post("/", authenticateToken, upload.single("image"), async (req, res) => {
  try {
  
    const { title, description } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description required" });
    }

    const newPost = new Post({
      user_id: req.user.id,
      title,
      description,
      status: "pending",
      image
    });

    await newPost.save();

    const populatedPost = await Post.findById(newPost._id).populate("user_id", "username photo");
    res.json(populatedPost);
  } catch (err) {
    console.error("Create post error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ----------------------------- Add comment to post ----------------------------- */
router.post("/:postId/comments", authenticateToken, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: "Comment text required" });

    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: "Post not found" });
    const newComment = new Comments({
      user_id: req.user.id,
      post_id: req.params.postId,
      text
    });

    await newComment.save();

    const populatedComment = await Comments.findById(newComment._id).populate("user_id", "username photo");
    res.json(populatedComment);
  } catch (err) {
    console.error("Add comment error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
