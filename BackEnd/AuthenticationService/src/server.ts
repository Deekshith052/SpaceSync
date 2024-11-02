import express from 'express';
import authRoutes from './routes/AuthRoutes';


const app = express();

app.use(express.json());
app.use('/api/v1/auth', authRoutes);

const PORT = process.env.PORT || 4010;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
