import express from 'express';
import {
  createReservation,
  getReservations,
  getReservationById,
  updateReservation,
  deleteReservation,
  getRecentReservationByUserId,
  getReservationsByUserId,
} from '../controller/ParkingReservationController';

const router = express.Router();

router.post('/slot/', createReservation);
router.get('/slot/', getReservations);
router.get('/slot/:id', getReservationById);
router.get('/slotByUserId/:userId',getRecentReservationByUserId);
router.get('/slotsInfoByUserId/:userId', getReservationsByUserId);
router.put('/slot/:id', updateReservation);
router.delete('/slot/:id', deleteReservation);

export default router;
