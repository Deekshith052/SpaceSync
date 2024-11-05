// src/controllers/bookingController.ts
import { Request, Response } from 'express';
import Booking, { IBooking } from '../model/WorkspaceBooking';

export const createBooking = async (req: Request, res: Response) => {
  try {
      const { date, ...otherFields } = req.body;

      // Validate the date format (YYYY-MM-DD)
      if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
          return res.status(400).json({ message: 'Invalid date format. Use YYYY-MM-DD.' });
      }

      // Convert date string to a JavaScript Date object
      const parsedDate = new Date(date);
      if (isNaN(parsedDate.getTime())) {
          return res.status(400).json({ message: 'Invalid date provided.' });
      }

      // Create a new booking instance
      const booking: IBooking = new Booking({
          ...otherFields,
          date: parsedDate,
      });

      await booking.save();
      res.status(201).json(booking);
  } catch (error) {
      console.error('Error creating booking:', error);
      res.status(400).json({ message: 'Error creating booking', error });
  }
};


export const createMultipleBookings = async (req: Request, res: Response) => {
  const bookingsData: IBooking[] = req.body; // Expecting an array of booking objects

  // Validate input
  if (!Array.isArray(bookingsData) || bookingsData.length === 0) {
      return res.status(400).json({ message: 'Invalid input. An array of bookings is required.' });
  }

  const createdBookings: IBooking[] = [];
  const errors: string[] = [];

  for (const bookingData of bookingsData) {
      const { date, ...otherFields } = bookingData;

      // Ensure the date is a valid Date object or ISO string
      const parsedDate = new Date(date);
      if (isNaN(parsedDate.getTime())) {
          errors.push(`Invalid date provided for booking: ${JSON.stringify(bookingData)}.`);
          continue; // Skip this booking if the date is invalid
      }

      // Create a new booking instance
      const booking: IBooking = new Booking({
          ...otherFields,
          date: parsedDate,
      });

      try {
          await booking.save();
          createdBookings.push(booking); // Add successfully created booking to the list
      } catch (error) {
          errors.push(`Error creating booking for data: ${JSON.stringify(bookingData)}. Error: ${error}`);
      }
  }

  // Respond with the results
  if (createdBookings.length > 0) {
      return res.status(201).json({ createdBookings, errors });
  } else {
      return res.status(400).json({ message: 'No bookings were created.', errors });
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

export const getWorkspacesByShiftProjectDate = async (req: Request, res: Response) => {
  const { shift, project, date } = req.query;

  // Validate query parameters
  if (typeof shift !== 'string' || typeof project !== 'string' || typeof date !== 'string') {
      return res.status(400).json({ message: 'Shift, project, and date must be provided as strings' });
  }

  try {
      // Convert date string to a JavaScript Date object
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999); // Set the end of the day

      // Find workspaces based on shift, project, and date
      const bookings = await Booking.find({
          shift: shift,
          project: project,
          date: {
              $gte: startDate,
              $lt: endDate,
          },
      });

      // Extract unique workspace IDs
      const workspaceIds = [...new Set(bookings.map(booking => booking.workspace_id))];

      // Return the list of workspace IDs
      return res.status(200).json({ workspace_ids: workspaceIds });
  } catch (error) {
      console.error('Error fetching workspaces:', error);
      return res.status(500).json({ message: 'Internal server error' });
  }
};



export const getBookingsByUserIdAndDate = async (req: Request, res: Response) => {
    const { user_id, date } = req.query;

    // Validate query parameters
    if (typeof user_id !== 'string' || typeof date !== 'string') {
        return res.status(400).json({ message: 'User ID and date must be provided as strings' });
    }

    try {
        // Convert date string to a JavaScript Date object for the specified day
        const startDate = new Date(date);
        const endDate = new Date(date);
        endDate.setHours(23, 59, 59, 999); // Set the end of the day

        // Find bookings based on user_id and date
        const bookings = await Booking.findOne({
            user_id: user_id,
            date: {
                $gte: startDate,
                $lt: endDate,
            },
        });

        // Return the list of bookings
        return res.status(200).json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


export const getAllBookingsByUserId = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
      // Find all bookings by user_id, selecting only the `date` and `workspace_id` fields
      const bookings = await Booking.find({ user_id:userId })
          .select('date workspace_id -_id')
          .sort({ date: -1 }); // Sort by date in descending order

      // Return the list of bookings with only `date` and `workspace_id`
      res.status(200).json(bookings);
  } catch (error) {
      console.error('Error fetching bookings:', error);
      res.status(500).json({ message: 'Internal server error' });
  } 
};


export const getTotalReservationsByDate = async (req: Request, res: Response) => {
  try {
    // Get today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to the start of today
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1); // Set to the start of tomorrow

    // Count bookings for today
    const totalReservations = await Booking.countDocuments({
      date: {
        $gte: today,
        $lt: tomorrow,
      },
    });

    // Respond with the total number of reservations
    res.status(200).json({ totalSlots:90 ,reservedSlots:totalReservations });
  } catch (error) {
    console.error('Error fetching total reservations:', error);
    res.status(500).json({ message: 'Error fetching total reservations', error });
  }
};
