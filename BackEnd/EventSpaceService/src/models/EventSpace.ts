import mongoose, { Document, Schema } from "mongoose";

export interface IEventSpace extends Document {
    eventspace_id: string;
    name:string;
    floor: number;
    capacity: number;
}

const EventSpaceSchema: Schema = new Schema({
    eventspace_id: { type: String, required: true, unique: true },
    floor: { type: Number, required: true },
    name:{type:String, required:true},
    capacity: { type: Number, required: true },
});

export default mongoose.model<IEventSpace>("EventSpace", EventSpaceSchema);
