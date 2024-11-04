import mongoose, { Document, Schema } from 'mongoose';

export interface Workspace extends Document {
  workspace_id: string;
  floor: number;
  project_name: string;
}

const workspaceSchema = new Schema({
  workspace_id: { type: String, required: true, unique: true },
  floor: { type: Number, required: true },
  project_name: { type: String, required: true },
});

export default mongoose.model<Workspace>('Workspace', workspaceSchema);
