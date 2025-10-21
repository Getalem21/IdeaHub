import mongoose from 'mongoose';
const postSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  description: String,
  image: String,
  status: { type: String, default: "pending" }, 
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Post', postSchema);

