import { Request, Response } from 'express';
import Reservation from '../models/ParkingReservation';

export const createReservation = async (req: Request, res: Response) => {
  try {
    const reservation = new Reservation(req.body);
    await reservation.save();
    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getReservations = async (req: Request, res: Response) => {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getReservationById = async (req: Request, res: Response) => {
  try {
    const reservation = await Reservation.find({parking_reservation_id:req.params.id});
    reservation ? res.json(reservation) : res.status(404).json({ message: 'Reservation not found' });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updateReservation = async (req: Request, res: Response) => {
  try {
    // Adding exit_at to the request body to ensure it’s always set to the current time
    const updatedReservation = await Reservation.findOneAndUpdate(
      { parking_reservation_id: req.params.id },
      { ...req.body, exit_at: new Date() },
      { new: true }
    );
    
    updatedReservation
      ? res.json(updatedReservation)
      : res.status(404).json({ message: 'Reservation not found' });
  } catch (error) {
    res.status(500).json({ error });
  }
};


export const deleteReservation = async (req: Request, res: Response) => {
  try {
    const deletedReservation = await Reservation.findOneAndDelete({parking_reservation_id:req.params.id});
    deletedReservation ? res.json({ message: 'Reservation deleted' }) : res.status(404).json({ message: 'Reservation not found' });
  } catch (error) {
    res.status(500).json({ error });
  }
};


export const getRecentReservationByUserId = async (req : Request, res: Response) => {
  const userId = req.params.userId;

  try {
    const recentReservation = await Reservation.find({ user_id: userId })
      .sort({ created_at: -1 })
      .limit(1)
      .exec();

    if (recentReservation.length > 0) {
      res.status(200).json(recentReservation[0]);
    } else {
      res.json({ message: 'No reservations found for this user.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};