import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text: String,
  createdAt: { type: Date, default: Date.now }
});

const postSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  description: String,
  image: String,
  status: { type: String, default: "pending" }, 
  comments: [commentSchema],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Post', postSchema);

