import express from 'express';
import mongoose from 'mongoose';
import feedbackRoutes from './routes/route';

const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/SpaceSyncFeedbackDB")
.then(() => console.log('Connected to MongoDB'))
.catch(error => console.error('Connection error', error));

app.use('/api/v1', feedbackRoutes);

const PORT = process.env.PORT || 4002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
