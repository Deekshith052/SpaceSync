import express from 'express';
import { createBooking, getBookings, updateBooking, deleteBooking, getBookingById, getEventSpacesByDate, createMultipleBookings, getBookingsByUserId } from '../controller/EventSpaceBookingController';

const router = express.Router();

router.post('/eventspacebookings', createBooking);
router.post('/eventspacebookingsMulti', createMultipleBookings);
router.get('/eventspacebookings', getBookings);
router.get('/eventspacebookings/:id', getBookingById);
router.get("/eventspacebookingsByDate",getEventSpacesByDate as any);
router.get('/eventspacebookingsByUserId/:user_id', getBookingsByUserId);
router.put('/eventspacebookings/:id', updateBooking);
router.delete('/eventspacebookings/:id', deleteBooking);

export default router;
