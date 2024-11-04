import mongoose, { Document, Schema } from 'mongoose';

export interface IEventSpaceBooking extends Document {
  user_id: string;
  name: string;
  eventspace_reservation_id: string;
  eventspace_id: string;
  event_date: Date;
  created_at: Date;
}

const EventSpaceBookingSchema: Schema = new Schema({
  user_id: { type: String, required: true },
  name: { type: String, required: true },
  eventspace_reservation_id: { type: String, unique: true, required: true },
  eventspace_id: { type: String, required: true },
  eventDate: { type: Date, required:true},
  created_at: { type: Date, default: Date.now }
});

export default mongoose.model<IEventSpaceBooking>('EventSpaceBooking', EventSpaceBookingSchema);
