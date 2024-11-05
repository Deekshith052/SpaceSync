// src/routes/bookingRoutes.ts
import { Router } from 'express';
import {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
  getWorkspacesByShiftProjectDate,
  createMultipleBookings,
  getBookingsByUserIdAndDate,
  getAllBookingsByUserId,
} from '../controller/WorkspaceBookingController';

const router = Router();

router.post('/workspacebooking', createBooking as any);
router.post('/workspacebookingMulti', createMultipleBookings as any)
router.get('/workspacebooking', getBookings);
router.get('/workspacebooking/:id', getBookingById);
router.get('/workspacebookingDone', getWorkspacesByShiftProjectDate as any);
router.get('/workspacebookingUserDate', getBookingsByUserIdAndDate as any);
router.get('/workspacebookingByUserId/:userId', getAllBookingsByUserId);
router.put('/workspacebooking/:id', updateBooking);
router.delete('/workspacebooking/:id', deleteBooking);

export default router;
