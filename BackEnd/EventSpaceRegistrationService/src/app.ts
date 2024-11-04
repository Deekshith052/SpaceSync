import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './config/db';
import eventSpaceBookingRoutes from './routes/EventSpaceBookingRoute';
import cors from 'cors';

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/api/v1', eventSpaceBookingRoutes);

connectDB();

export default app;
