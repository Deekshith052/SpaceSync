import mongoose, { Document, Schema } from 'mongoose';

export interface IFeedback extends Document {
  userId: number;
  content: string;
}

const FeedbackSchema: Schema = new Schema({
  userId: { type: Number, required: true },
  content: { type: String, required: true },
});

export const Feedback = mongoose.model<IFeedback>('Feedback', FeedbackSchema);
