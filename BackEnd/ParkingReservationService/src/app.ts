import express from 'express';
import mongoose from 'mongoose';
import reservationRoutes from './routes/ParkingReservationRoute';
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors());
const mongoURI = 'mongodb+srv://deekshith:O88J7wjAZw9G9omo@cluster0.aznry.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose
  .connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Database connection error:', error));

app.use('/api/v1/parking/reservations', reservationRoutes);

export default app;
