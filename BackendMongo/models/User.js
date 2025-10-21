import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  phone: String,
  photo: String,
  role: { type: String, enum: ["user", "admin"], default: "user" },
  isActive: { type: Boolean, default: true }, // false = blocked
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', userSchema);




