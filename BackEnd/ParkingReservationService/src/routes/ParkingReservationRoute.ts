import express from 'express';
import {
  createReservation,
  getReservations,
  getReservationById,
  updateReservation,
  deleteReservation,
  getRecentReservationByUserId,
} from '../controller/ParkingReservationController';

const router = express.Router();

router.post('/slot/', createReservation);
router.get('/slot/', getReservations);
router.get('/slot/:id', getReservationById);
router.get('/slotByUserId/:userId',getRecentReservationByUserId);
router.put('/slot/:id', updateReservation);
router.delete('/slot/:id', deleteReservation);

export default router;
