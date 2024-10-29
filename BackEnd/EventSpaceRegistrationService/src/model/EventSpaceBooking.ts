import mongoose, { Document, Schema } from 'mongoose';

interface IEventSpaceBooking extends Document {
  user_id: number;
  name: string;
  eventspace_reservation_id: number;
  eventspace_id: number;
  starttime: Date;
  endtime: Date;
  created_at: Date;
}

const EventSpaceBookingSchema: Schema = new Schema({
  user_id: { type: Number, required: true },
  name: { type: String, required: true },
  eventspace_reservation_id: { type: Number, unique: true, required: true },
  eventspace_id: { type: Number, required: true },
  starttime: { type: Date, required: true },
  endtime: { type: Date, required: true },
  created_at: { type: Date, default: Date.now }
});

export default mongoose.model<IEventSpaceBooking>('EventSpaceBooking', EventSpaceBookingSchema);
