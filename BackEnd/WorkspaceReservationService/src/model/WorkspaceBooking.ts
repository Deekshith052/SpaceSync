import { Schema, model, Document } from 'mongoose';

export interface IBooking extends Document {
workspace_reservation_id:Number
  user_id: number;
  workspace_id: number;
  shift: string;
  date: Date;
}

const bookingSchema = new Schema<IBooking>({
    workspace_reservation_id:{type:Number,required:true, unique:true},
  user_id: { type: Number, required: true },
  workspace_id: { type: Number, required: true },
  shift: { type: String, required: true },
  date: { type: Date, required: true },
});

const Booking = model<IBooking>('Booking', bookingSchema);
export default Booking;
