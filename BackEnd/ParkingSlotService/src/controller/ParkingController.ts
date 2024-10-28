// src/controllers/parkingController.ts
import { Request, Response } from 'express';
import ParkingSlot from '../model/ParkingSlot';

// Get all parking slots
export const getAllSlots = async (req: Request, res: Response) => {
  try {
    const slots = await ParkingSlot.find();
    res.json(slots);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching slots', error });
  }
};

// Get a single parking slot by ID
export const getSlotById = async (req: Request, res: Response) => {
  try {
    const  {id}  = req.params;
    const slot = await ParkingSlot.find({parking_id:id});

    if (!slot) {
      return res.status(404).json({ message: 'Slot not found' });
    }

    res.json(slot);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching slot', error });
  }
};

// Create a new parking slot
export const createSlot = async (req: Request, res: Response) => {
  try {
    const newSlot = new ParkingSlot(req.body);
    await newSlot.save();
    res.status(201).json(newSlot);
  } catch (error) {
    res.status(400).json({ message: 'Error creating slot', error });
  }
};


//create multiple parking slots
export const createMultipleSlots=async (req:Request,res:Response)=>{
  try{
    const slots = req.body;

    if (!Array.isArray(slots)) {
      return res.status(400).json({ message: 'Expected an array of slots' });
    }

    // Insert multiple slots
    const newSlots = await ParkingSlot.insertMany(slots);
    res.status(201).json(newSlots);
  }
  catch(err){
    res.status(400).json({ message: 'Error creating multiple slot', err })
  }
}

// Update a parking slot by ID
export const updateSlot = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedSlot = await ParkingSlot.findOneAndUpdate({parking_id:id}, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedSlot) {
      return res.status(404).json({ message: 'Slot not found' });
    }

    res.json(updatedSlot);
  } catch (error) {
    res.status(400).json({ message: 'Error updating slot', error });
  }
};

// Delete a parking slot by ID
export const deleteSlot = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedSlot = await ParkingSlot.findOneAndDelete({parking_id:id});

    if (!deletedSlot) {
      return res.status(404).json({ message: 'Slot not found' });
    }

    res.json({ message: 'Slot deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting slot', error });
  }
};
