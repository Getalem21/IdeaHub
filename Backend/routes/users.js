import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js';


const router = express.Router();

// Register a new user
router.post('/signup', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.json(newUser);
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err });
  }
});

// Get user profile
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(404).json({ message: 'User not found' });
  }
});


router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1d' });
  res.json({ token, user });
});






/*import express from "express";
import multer from "multer";
import bcrypt from "bcrypt";
import db from "../config/db.js"; // ✅ use shared connection
import jwt from "jsonwebtoken";
import { authenticateToken } from "../middleware/auth.js";  

const JWT_SECRET = "your_super_secret_key";
const router = express.Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

/* ----------------------------- Signup route ----------------------------- 
router.post("/signup", upload.single("photo"), async (req, res) => {
  try {
    const { username, email, password, phone } = req.body;
    const photo = req.file ? req.file.filename : null;

    // Check if user exists
    const [existingUser] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    await db.query(
      "INSERT INTO users (username, email, password, phone, photo) VALUES (?, ?, ?, ?, ?)",
      [username, email, hashedPassword, phone, photo]
    );

    res.json({ message: "Signup successful!" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error during signup" });
  }
});
///////////////////////////////////////////////////signin///////////////////////////////////////////////////////////////////////
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // 1. Check if user exists
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (users.length === 0) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const user = users[0];

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 3. Create JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 4. Return user info and token
    res.json({
      user: {
        id: user.id,
        name: user.username,
        email: user.email,
        phone: user.phone,
        photo: user.photo
      },
      token
    });

  } catch (err) {
    console.error("Signin error:", err);
    res.status(500).json({ message: "Server error during signin" });
  }
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get("/profile",authenticateToken, async (req, res) => {
  try {
    const [users] = await db.query("SELECT id, username, email, phone, photo FROM users WHERE id = ?", [req.user.id]);
    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(users[0]);
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
});
export default router;
*/