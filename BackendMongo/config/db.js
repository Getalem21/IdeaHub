import mongoose from 'mongoose';
import User from '../models/User.js'; 
import Post from '../models/Post.js'; 
import commentSchema from '../models/Post.js';

mongoose.connect('mongodb://localhost:27017/ideaHub', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('Connected to MongoDB');

})
.catch((err) => console.error('Connection error:', err));


