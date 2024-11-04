import mongoose, { Document, Schema } from 'mongoose';

export interface Workspace extends Document {
  workspace_id: number;
  floor: number;
  availability: boolean;
  project_name: string;
}

const workspaceSchema = new Schema({
  workspace_id: { type: Number, required: true, unique: true },
  floor: { type: Number, required: true },
  project_name: { type: String, required: true },
});

export default mongoose.model<Workspace>('Workspace', workspaceSchema);
