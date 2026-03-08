import mongoose from 'mongoose';

const chatsSchema = new mongoose.Schema({
  sender_user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiver_user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Chats', chatsSchema);
