import { Request, Response } from 'express';
import EventSpaceBooking, { IEventSpaceBooking } from '../model/EventSpaceBooking';

// Create a booking with formatted eventDate
export const createBooking = async (req: Request, res: Response) => {
  try {
    // Parse eventDate from request body
    const { eventDate, ...otherData } = req.body;

    // Convert eventDate to ISO format
    const formattedEventDate = new Date(`${eventDate}T00:00:00.000Z`);

    const booking = new EventSpaceBooking({
      ...otherData,
      eventDate: formattedEventDate, // Store formatted date
    });

    const result = await booking.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error });
  }
};

// Create multiple bookings
export const createMultipleBookings = async (req: Request, res: Response) => {
  try {
    const bookingsData = req.body; // Expecting an array of booking objects

    // Validate and format each booking data
    const bookings = bookingsData.map((data:IEventSpaceBooking) => {
      const { event_date, ...otherData } = data;
      const formattedEventDate = new Date(`${event_date}T00:00:00.000Z`);
      return { ...otherData, eventDate: formattedEventDate };
    });

    // Insert multiple bookings into the database
    const result = await EventSpaceBooking.insertMany(bookings);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error });
  }
};

// Get all bookings
export const getBookings = async (_req: Request, res: Response) => {
  try {
    const bookings = await EventSpaceBooking.find();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Get booking by reservation ID
export const getBookingById = async (req: Request, res: Response) => {
  try {
    const booking = await EventSpaceBooking.findOne({ eventspace_reservation_id: req.params.id });
    if (!booking) {
      res.status(404).json({ error: 'Booking not found' });
    } else {
      res.json(booking);
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

// Update a booking
export const updateBooking = async (req: Request, res: Response) => {
  try {
    const booking = await EventSpaceBooking.findOneAndUpdate(
      { eventspace_reservation_id: req.params.id },
      req.body,
      { new: true }
    );
    if (!booking) {
      res.status(404).json({ error: 'Booking not found' });
    } else {
      res.json(booking);
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

// Delete a booking
export const deleteBooking = async (req: Request, res: Response) => {
  try {
    const result = await EventSpaceBooking.findOneAndDelete({ eventspace_reservation_id: req.params.id });
    if (!result) {
      res.status(404).json({ error: 'Booking not found' });
    } else {
      res.json({ message: 'Booking deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getEventSpacesByDate = async (req: Request, res: Response) => {
  const date = req.query.date; // Get date from query parameters

  // Ensure date is provided and is a string
  if (typeof date !== 'string') {
    return res.status(400).json({ error: 'Date parameter is required and must be a string.' });
  }

  // Ensure date is in the "YYYY-MM-DD" format
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD.' });
  }

  try {
    // Parse date and set to start and end of the day
    const startDate = new Date(`${date}T00:00:00.000Z`);
    const endDate = new Date(`${date}T23:59:59.999Z`);

    // Find all bookings for the specified date
    const bookings = await EventSpaceBooking.find({
      eventDate: { $gte: startDate, $lte: endDate },
    });

    // Extract eventspace_id from bookings
    const reservedEventSpaceIds = bookings.map(booking => booking.eventspace_id);

    res.json(reservedEventSpaceIds);
  } catch (error) {
    res.status(500).json({ error });
  }
};

