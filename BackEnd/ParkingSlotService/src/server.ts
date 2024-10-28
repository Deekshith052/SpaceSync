import express from 'express';
import mongoose from 'mongoose';
import router from './routes/ParkingRoutes';

const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/SpaceSyncParkingSlotsDB")
.then(() => console.log('Connected to MongoDB'))
.catch(error => console.error('Connection error', error));

app.use('/api/v1', router);

const PORT = process.env.PORT || 4003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
