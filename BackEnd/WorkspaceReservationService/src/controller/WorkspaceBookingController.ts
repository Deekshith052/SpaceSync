// src/controllers/bookingController.ts
import { Request, Response } from 'express';
import Booking, { IBooking } from '../model/WorkspaceBooking';

export const createBooking = async (req: Request, res: Response) => {
  try {
    const booking: IBooking = new Booking(req.body);
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ message: 'Error creating booking', error });
  }
};

export const getBookings = async (_req: Request, res: Response) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error });
  }
};

export const getBookingById = async (req: Request, res: Response) => {
  try {
    const booking = await Booking.findOne({ workspace_reservation_id: req.params.id });
    if (booking) {
        res.json(booking);
      } else {
        res.status(404).json({ message: "Booking not found" });
      }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching booking', error });
  }
};

export const updateBooking = async (req: Request, res: Response) => {
  try {
    const booking = await Booking.findOneAndUpdate({ workspace_reservation_id: req.params.id },req.body,{new:true});
    if (booking) {
        res.json(booking);
      } else {
        res.status(404).json({ message: "Booking not found" });
      }
  } catch (error) {
    res.status(400).json({ message: 'Error updating booking', error });
  }
};

export const deleteBooking = async (req: Request, res: Response) => {
  try {
    const booking = await Booking.findOneAndDelete({ workspace_reservation_id: req.params.id });
    if (booking) {
      res.json({ message: "Booking cancelled" });
    } else {
      res.status(404).json({ message: "Booking not found" });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting booking', error });
  }
};
