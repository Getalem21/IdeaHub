import mongoose from 'mongoose'
mongoose.connect('mongodb://localhost:27017/ideaHub', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('Connected to MongoDB');

})
.catch((err) => console.error('Connection error:', err));


