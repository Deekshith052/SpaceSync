import mongoose, { Document, Schema } from "mongoose";

export interface IEventSpace extends Document {
    eventspace_id: number;
    floor: number;
    availability: boolean;
    capacity: number;
}

const EventSpaceSchema: Schema = new Schema({
    eventspace_id: { type: Number, required: true, unique: true },
    floor: { type: Number, required: true },
    availability: { type: Boolean, default: true },
    capacity: { type: Number, required: true },
});

export default mongoose.model<IEventSpace>("EventSpace", EventSpaceSchema);
