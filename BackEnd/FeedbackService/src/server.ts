import express from 'express';
import mongoose from 'mongoose';
import feedbackRoutes from './routes/route';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect("mongodb+srv://deekshith:O88J7wjAZw9G9omo@cluster0.aznry.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => console.log('Connected to MongoDB'))
.catch(error => console.error('Connection error', error));

app.use('/api/v1', feedbackRoutes);

const PORT = process.env.PORT || 4002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
