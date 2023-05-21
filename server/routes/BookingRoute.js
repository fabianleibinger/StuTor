import express from 'express';
import { createBooking, getBooking, updateBooking, deleteBooking } from '../controllers/BookingController.js';

const router = express.Router();

router.post('/', createBooking);
router.get('/:bookingId', getBooking);
router.put('/:bookingId', updateBooking);
router.delete('/:bookingId', deleteBooking);

export default router;