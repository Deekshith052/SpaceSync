// src/controllers/eventspaceController.ts
import { Request, Response } from "express";
import EventSpace from "../models/EventSpace"; // Ensure the path is correct

// Get all event spaces
export const getEventSpaces = async (req: Request, res: Response) => {
  try {
    const eventSpaces = await EventSpace.find();
    res.status(200).json(eventSpaces);
  } catch (error) {
    console.error("Error retrieving event spaces:", error);
    res.status(500).json({ message: "Error retrieving event spaces", error });
  }
};

// Get a single event space by eventspace_id
export const getEventSpace = async (req: Request, res: Response) => {
  try {
    const eventSpace = await EventSpace.findOne({ eventspace_id: parseInt(req.params.id, 10) });
    if (eventSpace) {
      res.status(200).json(eventSpace);
    } else {
      res.status(404).json({ message: "Event space not found" });
    }
  } catch (error) {
    console.error("Error retrieving event space:", error);
    res.status(500).json({ message: "Error retrieving event space", error });
  }
};

// Create a new event space
export const createEventSpace = async (req: Request, res: Response) => {
  try {
    const newEventSpace = new EventSpace(req.body);
    const savedEventSpace = await newEventSpace.save();
    res.status(201).json(savedEventSpace);
  } catch (error) {
    console.error("Error creating event space:", error);
    res.status(400).json({ message: "Error creating event space", error });
  }
};

// Update an event space by eventspace_id
export const updateEventSpace = async (req: Request, res: Response) => {
  try {
    const eventSpace = await EventSpace.findOneAndUpdate(
      { eventspace_id: parseInt(req.params.id) },
      req.body,
      { new: true }
    );
    if (eventSpace) {
      res.status(200).json(eventSpace);
    } else {
      res.status(404).json({ message: "Event space not found" });
    }
  } catch (error) {
    console.error("Error updating event space:", error);
    res.status(400).json({ message: "Error updating event space", error });
  }
};

// Delete an event space by eventspace_id
export const deleteEventSpace = async (req: Request, res: Response) => {
  try {
    const eventSpace = await EventSpace.findOneAndDelete({ eventspace_id: parseInt(req.params.id, 10) });
    if (eventSpace) {
      res.status(200).json({ message: "Event space deleted" });
    } else {
      res.status(404).json({ message: "Event space not found" });
    }
  } catch (error) {
    console.error("Error deleting event space:", error);
    res.status(500).json({ message: "Error deleting event space", error });
  }
};
