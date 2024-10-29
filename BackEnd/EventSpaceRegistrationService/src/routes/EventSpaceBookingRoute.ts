import express from 'express';
import { createBooking, getBookings, updateBooking, deleteBooking, getBookingById } from '../controller/EventSpaceBookingController';

const router = express.Router();

router.post('/', createBooking);
router.get('/', getBookings);
router.get('/:id', getBookingById);
router.put('/:id', updateBooking);
router.delete('/:id', deleteBooking);

export default router;
