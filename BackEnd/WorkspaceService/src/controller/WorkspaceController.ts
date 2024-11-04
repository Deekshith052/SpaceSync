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

export const createMultipleWorkspaces = async (req: Request, res: Response) => {
  const workspacesData = req.body; // Expecting an array of workspace objects

  // Validate input
  if (!Array.isArray(workspacesData) || workspacesData.length === 0) {
      return res.status(400).json({ message: 'Please provide an array of workspaces.' });
  }

  try {
      // Insert all workspaces at once
      const createdWorkspaces = await Workspace.insertMany(workspacesData);
      return res.status(201).json(createdWorkspaces);
  } catch (error) {
      console.error('Error creating workspaces:', error);
      return res.status(400).json({ message: 'Error creating workspaces', error });
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

export const getWorkspacesByProjectName = async (req: Request, res: Response) => {
  const { project_name } = req.query;

  // Validate the project_name parameter
  if (typeof project_name !== 'string') {
      return res.status(400).json({ message: 'Invalid project_name parameter. It must be a string.' });
  }

  try {
      // Find workspaces that match the project_name
      const workspaces = await Workspace.find({ project_name: project_name });


      // Return the list of workspaces
       res.status(200).json(workspaces);
  } catch (error) {
      console.error('Error fetching workspaces:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};