import express from 'express';
import connectDB from './config/db';
import workspaceRoutes from './routes/WorkSpaceRoute';

connectDB();

const app = express();
app.use(express.json());

app.use('/api/v1/workspace', workspaceRoutes);

export default app;
