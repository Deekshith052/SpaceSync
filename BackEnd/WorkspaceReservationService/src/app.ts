import express from 'express';
import bookingRoutes from './routes/WorkspaceBookingRoute';
import connectDB from './config/db';
import cors from 'cors';
const app = express();

app.use(express.json());
app.use(cors());
// Connect to MongoDB
connectDB();

// Routes
app.use('/api/v1', bookingRoutes);

export default app;
