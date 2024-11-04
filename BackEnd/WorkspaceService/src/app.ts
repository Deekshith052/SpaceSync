import express from 'express';
import connectDB from './config/db';
import workspaceRoutes from './routes/WorkSpaceRoute';
import cors from 'cors';
connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/v1', workspaceRoutes);

export default app;
