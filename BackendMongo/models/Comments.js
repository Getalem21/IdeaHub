import mongoose from 'mongoose';

const commentsSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text: String,
  createdAt: { type: Date, default: Date.now }
});
export default mongoose.model('Comments', commentsSchema);