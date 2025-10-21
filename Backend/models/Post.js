import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: String,
  description: String,
  user_id: String,
  image: String,
  comments: [
    {
      user_id: String,
      text: String,
      createdAt: { type: Date, default: Date.now }
    }
  ]
});

export default mongoose.model('Post', postSchema);
