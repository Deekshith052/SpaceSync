import express from 'express';
import mongoose from 'mongoose';
import reservationRoutes from './routes/ParkingReservationRoute';

const app = express();
app.use(express.json());

const mongoURI = 'mongodb://127.0.0.1:27017/SpaceSyncParkingReservationDB';

mongoose
  .connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Database connection error:', error));

app.use('/api/v1/parking/reservations', reservationRoutes);

export default app;
