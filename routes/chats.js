import  express from  'express' ;
import Chats from '../models/Chats.js';
import { authenticateToken } from '../middleware/auth.js';
const router = express.Router();

// Send a message
    router.post('/:receiverId',authenticateToken, async (req, res) => {
    try {
        const { message } = req.body;
        const receiverId = req.params.receiverId;
        const senderId = req.user.id;   
        const newChat = new Chats({
            sender_user_id: req.user.id,
            receiver_user_id: receiverId,   
            text: message
        });
        await newChat.save();
        res.status(201).json(newChat);
    } catch (err) {
        console.error('Error sending message:', err);
        res.status(500).json({ message: 'Server error' });
    }       
});

// Get chat messages between two users  
router.get('/:userId', authenticateToken, async (req, res) => {
    try {
        const otherUserId = req.params.userId;
        const chats = await Chats.find({
            $or: [
                { sender_user_id: req.user.id, receiver_user_id: otherUserId },
                { sender_user_id: otherUserId, receiver_user_id: req.user.id }  
            ]
        }).sort({ createdAt: 1 }); // Sort by oldest first
        res.json(chats);
    }
    catch (err) {
        console.error('Error fetching messages:', err);
        res.status(500).json({ message: 'Server error' });
    }   

});

export default router;
