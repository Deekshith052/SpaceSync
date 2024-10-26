// src/models/User.ts
import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
  user_id: number;
  password: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: number;
  department: string;
  role: string;
  designation: string;
  created_at: Date;
}

const UserSchema: Schema = new Schema({
  user_id: { type: Number, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  phone_number: { type: Number, required: true },
  department: { type: String, required: true },
  role: { type: String, required: true },
  designation: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

export const User = mongoose.model<IUser>('User', UserSchema);
