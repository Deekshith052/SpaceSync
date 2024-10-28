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
    const updatedReservation = await Reservation.findOneAndUpdate({parking_reservation_id:req.params.id}, req.body, { new: true });
    updatedReservation ? res.json(updatedReservation) : res.status(404).json({ message: 'Reservation not found' });
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
