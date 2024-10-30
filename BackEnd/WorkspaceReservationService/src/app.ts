import express from 'express';
import bookingRoutes from './routes/WorkspaceBookingRoute';
import connectDB from './config/db';

const app = express();

app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/v1/workspacebooking', bookingRoutes);

export default app;
