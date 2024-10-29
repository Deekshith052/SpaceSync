import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
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
