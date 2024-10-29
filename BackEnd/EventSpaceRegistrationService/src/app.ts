import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './config/db';
import eventSpaceBookingRoutes from './routes/EventSpaceBookingRoute';

const app = express();

app.use(bodyParser.json());
app.use('/api/v1/eventSpaceBookings', eventSpaceBookingRoutes);

connectDB();

export default app;
