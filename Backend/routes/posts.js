import Post from '../models/Post.js';

/*Create a new post
router.post('/', async (req, res) => {
  const newPost = new Post(req.body);
  await newPost.save();
  res.json(newPost);
});

// Get all posts
router.get('/', async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});


/*import express from "express";
import db from "../config/db.js";
import multer from "multer";
import { authenticateToken } from "../middleware/auth.js";  

const router = express.Router();

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"), // make sure folder exists
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Get all posts with comments
router.get("/", async (req, res) => {
  try {
    const [posts] = await db.query(
      `SELECT posts.*, users.username as user_name
       ,image  FROM posts JOIN users ON posts.user_id = users.id
       ORDER BY posts.id DESC`
    );

    const [comments] = await db.query(
      `SELECT comments.*, users.username as user_name ,users.photo AS user_photo FROM comments
       JOIN users ON comments.user_id = users.id`
    );

    const postsWithComments = posts.map((post) => ({
      ...post,
      comments: comments.filter((c) => c.post_id === post.id),
    }));

    res.json(postsWithComments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Create a new post
router.post("/",authenticateToken, upload.single("image"), async (req, res) => {
  try {
    const { userId, title, description } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!title || !description)
      return res.status(400).json({ message: "Title and description required" });

    const [result] = await db.query(
      "INSERT INTO posts (user_id, title, description, image) VALUES (?, ?, ?, ?)",
      [userId, title, description, image]
    );

    const [[post]] = await db.query(
      "SELECT posts.*, users.username as user_name FROM posts JOIN users ON posts.user_id = users.id WHERE posts.id = ?",
      [result.insertId]
    );

    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Add comment to a post
router.post("/:postId/comments",authenticateToken, async (req, res) => {
  try {
    const { postId } = req.params.postId;
    const { userId, text } = req.body;

    if (!text) return res.status(400).json({ message: "Comment text required" });

    const [result] = await db.query(
      "INSERT INTO comments (post_id, user_id, text) VALUES (?, ?, ?)",
      [postId, userId, text]
    );

    const [[comment]] = await db.query(
      "SELECT comments.*, users.username as user_name FROM comments JOIN users ON comments.user_id = users.id WHERE comments.id = ?",
      [result.insertId]
    );

    res.json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
*/