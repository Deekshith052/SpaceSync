// src/routes/bookingRoutes.ts
import { Router } from 'express';
import {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
} from '../controller/WorkspaceBookingController';

const router = Router();

router.post('/bookings', createBooking);
router.get('/bookings', getBookings);
router.get('/bookings/:id', getBookingById);
router.put('/bookings/:id', updateBooking);
router.delete('/bookings/:id', deleteBooking);

export default router;
