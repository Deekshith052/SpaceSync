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

export const createMultipleEvents = async (req: Request, res: Response) => {
  try {
    // Ensure req.body is an array
    if (!Array.isArray(req.body)) {
      return res.status(400).json({ message: "Request body must be an array of event spaces." });
    }

    // Create an array to hold promises for saving each event space
    const promises = req.body.map(eventSpaceData => {
      const newEventSpace = new EventSpace(eventSpaceData);
      return newEventSpace.save(); // Save each event space
    });

    // Wait for all promises to resolve
    const savedEventSpaces = await Promise.all(promises);
    res.status(201).json(savedEventSpaces); // Return saved event spaces
  } catch (error) {
    console.error("Error creating multiple event spaces:", error);
    res.status(400).json({ message: "Error creating multiple event spaces", error });
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

export const getEventSpacesByCapacity = async (req: Request, res: Response) => {
  const { capacity } = req.params; // Get capacity from route parameters

  // Validate the capacity parameter
  const parsedCapacity = parseInt(capacity, 10); // Convert capacity to an integer

  if (isNaN(parsedCapacity)) {
    return res.status(400).json({ error: 'Invalid or missing capacity parameter' });
  }

  try {
    // Find event spaces with capacity greater than or equal to the specified value and sort by capacity
    const eventSpaces = await EventSpace.find({ capacity: { $gte: parsedCapacity } }).sort({ capacity: 1 });

    res.status(200).json(eventSpaces);
  } catch (error) {
    console.error('Error fetching event spaces:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
