import mongoose from 'mongoose'
mongoose.connect('MONGODB_URI="mongodb+srv://Vercel-Admin-atlas-canary-marble:GXbzqhWXLoNy5bL8@atlas-canary-marble.i17nr7e.mongodb.net/?retryWrites=true&w=majority"', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('Connected to MongoDB');

})
.catch((err) => console.error('Connection error:', err));


