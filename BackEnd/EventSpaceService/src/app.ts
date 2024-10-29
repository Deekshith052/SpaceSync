import express from 'express';
import connectDB from './config/db';
import workspaceRoutes from './routes/EventSpaceRoutes';

connectDB();

const app = express();
app.use(express.json());

app.use('/api/v1/eventspace', workspaceRoutes);

export default app;
