import { Schema, model, Document } from 'mongoose';

export interface IBooking extends Document {
workspace_reservation_id:string
  user_id: string;
  workspace_id: string;
  shift: string;
  project:string,
  date: Date;
}

const bookingSchema = new Schema<IBooking>({
    workspace_reservation_id:{type:String,required:true, unique:true},
  user_id: { type: String, required: true },
  workspace_id: { type: String, required: true },
  shift: { type: String, required: true },
  project:{type:String, required:true},
  date: { type: Date, required: true },
});

const Booking = model<IBooking>('WorkspaceBooking', bookingSchema);
export default Booking;
