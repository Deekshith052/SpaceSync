import { Request, Response } from 'express';
import Workspace from '../models/WorkSpace'; // Make sure the path is correct

// Get all workspaces
export const getWorkspaces = async (req: Request, res: Response) => {
  try {
    const workspaces = await Workspace.find();
    res.json(workspaces);
  } catch (error) {
    console.error('Error retrieving workspaces:', error);
    res.status(500).json({ message: 'Error retrieving workspaces', error });
  }
};

// Get a single workspace by ID
export const getWorkspace = async (req: Request, res: Response) => {
  try {
    const workspace = await Workspace.findOne({ workspace_id: parseInt(req.params.id) });
    if (workspace) {
      res.json(workspace);
    } else {
      res.status(404).json({ message: 'Workspace not found' });
    }
  } catch (error) {
    console.error('Error retrieving workspace:', error);
    res.status(500).json({ message: 'Error retrieving workspace', error });
  }
};

// Create a new workspace
export const createWorkspace = async (req: Request, res: Response) => {
  try {
    const newWorkspace = new Workspace(req.body);
    await newWorkspace.save();
    res.status(201).json(newWorkspace);
  } catch (error) {
    console.error('Error creating workspace:', error);
    res.status(400).json({ message: 'Error creating workspace', error });
  }
};

// Update a workspace by ID
export const updateWorkspace = async (req: Request, res: Response) => {
  try {
    const workspace = await Workspace.findOneAndUpdate(
      { workspace_id: parseInt(req.params.id) },
      req.body,
      { new: true }
    );
    if (workspace) {
      res.json(workspace);
    } else {
      res.status(404).json({ message: 'Workspace not found' });
    }
  } catch (error) {
    console.error('Error updating workspace:', error);
    res.status(400).json({ message: 'Error updating workspace', error });
  }
};

// Delete a workspace by ID
export const deleteWorkspace = async (req: Request, res: Response) => {
  try {
    const workspace = await Workspace.findOneAndDelete({ workspace_id: parseInt(req.params.id) });
    if (workspace) {
      res.json({ message: 'Workspace deleted' });
    } else {
      res.status(404).json({ message: 'Workspace not found' });
    }
  } catch (error) {
    console.error('Error deleting workspace:', error);
    res.status(500).json({ message: 'Error deleting workspace', error });
  }
};
