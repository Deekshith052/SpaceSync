import { Request, Response } from 'express';
import EventSpaceBooking from '../model/EventSpaceBooking';

export const createBooking = async (req: Request, res: Response) => {
  try {
    const booking = new EventSpaceBooking(req.body);
    const result = await booking.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const getBookings = async (_req: Request, res: Response) => {
  try {
    const bookings = await EventSpaceBooking.find();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getBookingById = async (req: Request, res: Response) => {
    try {
      const booking = await EventSpaceBooking.findOne(
        { eventspace_reservation_id: req.params.id }
      );
      if (!booking) { res.status(404).json({ error: 'Booking not found' });}
      else{
      res.json(booking);
      }
    } catch (error) {
      res.status(400).json({ error });
    }
  };

export const updateBooking = async (req: Request, res: Response) => {
  try {
    const booking = await EventSpaceBooking.findOneAndUpdate(
      { eventspace_reservation_id: req.params.id },
      req.body,
      { new: true }
    );
    if (!booking) { res.status(404).json({ error: 'Booking not found' });}
    else{
    res.json(booking);
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const deleteBooking = async (req: Request, res: Response) => {
  try {
    const result = await EventSpaceBooking.findOneAndDelete({ eventspace_reservation_id: req.params.id });
    if (!result) { res.status(404).json({ error: 'Booking not found' });}
    else{
    res.json({ message: 'Booking deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};
