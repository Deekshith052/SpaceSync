// src/models/ParkingSlot.ts
import mongoose, { Document, Schema } from 'mongoose';

interface ParkingSlot extends Document {
  parking_id: number;
  slot_number: string;
  vehicle_type: string;
  floor: number;
  availability: boolean;
}

const ParkingSlotSchema = new Schema({
  parking_id: { type: Number, required: true, unique: true },
  slot_number: { type: String, required: true },
  vehicle_type: { type: String, required: true },
  floor: { type: Number, required: true },
  availability: { type: Boolean, required: true, default: true },
});

export default mongoose.model<ParkingSlot>('ParkingSlot', ParkingSlotSchema);
