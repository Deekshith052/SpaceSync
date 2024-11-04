import mongoose, { Document, Schema } from 'mongoose';

export interface IFeedback extends Document {
  feedback_id: string;
  userId: string;
  content: string;
  rating: number;
  reply: string;
}

const FeedbackSchema: Schema = new Schema({
  feedback_id:{type:String, required:true, unique:true},
  userId: { type: String, required: true },
  content: { type: String, required: true },
  rating:{type:Number, required:true},
  reply:{type:String}
});

export const Feedback = mongoose.model<IFeedback>('Feedback', FeedbackSchema);
