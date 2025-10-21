import express from "express";
import multer from "multer";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { authenticateToken } from "../middleware/auth.js";

const JWT_SECRET = "your_super_secret_key";
const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

/* ----------------------------- Signup ----------------------------- */
router.post("/signup", upload.single("photo"), async (req, res) => {

  try {
    const { username, email, password, phone } = req.body;
    const photo = req.file ? req.file.filename : null;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      phone,
      photo
    });

    await newUser.save();
    res.json({ message: "Signup successful!" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error during signup" });
  }
});

/* ----------------------------- Signin ----------------------------- */
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: user._id, email: user.email,role:user.role }, JWT_SECRET, { expiresIn: "7d" });

    res.json({
      user: {
        id: user._id,
        name: user.username,
        email: user.email,
        phone: user.phone,
        photo: user.photo,
        role: user.role
      },
      token
    });
  } catch (err) {
    console.error("Signin error:", err);
    res.status(500).json({ message: "Server error during signin" });
  }
});

/* ----------------------------- Profile ----------------------------- */
router.get("/profile", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
