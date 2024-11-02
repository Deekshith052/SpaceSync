import mongoose, { Document, Schema } from 'mongoose';

export interface ReservationDocument extends Document {
  user_id: number;
  parking_reservation_id: string;
  parking_id: number;
  created_at: Date;
  exit_at: Date;
}

const ReservationSchema: Schema = new Schema({
  parking_reservation_id: { type: String, unique: true, required: true },
  user_id: { type: Number, required: true },
  parking_id: { type: Number, required: true },
  created_at: { type: Date, default: Date.now },
  exit_at: { type: Date },
});

export default mongoose.model<ReservationDocument>('Reservation', ReservationSchema);
