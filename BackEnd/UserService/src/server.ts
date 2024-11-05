// src/app.ts
import express from 'express';
import Router from './routes/UserRoutes';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());
mongoose.connect("mongodb://127.0.0.1:27017/SpaceSyncUserDB")
.then(() => console.log('Connected to MongoDB'))
.catch(error => console.error('Connection error', error));

app.use('/api/v1', Router);

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
