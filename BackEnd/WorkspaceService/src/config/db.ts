import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://deekshith:O88J7wjAZw9G9omo@cluster0.aznry.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    console.log('connected to mongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
