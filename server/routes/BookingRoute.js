import express from 'express';
import { 
    createBooking, 
    getBooking, 
    getBookingsOfStudysession, 
    getBookingsCreatedByUser,
    getBookingsOfStudysessionCreatedByUser,
    updateBooking, 
    deleteBooking,
    confirmBooking, 
    setBookingIsPayed,
    getBookingsOfTutor
} from '../controllers/BookingController.js';

const router = express.Router();

router.post('/', createBooking);
router.get('/id/:bookingId', getBooking);
router.get('/ofStudysession/:studysessionId', getBookingsOfStudysession);
router.get('/createdBy/:userId', getBookingsCreatedByUser);
router.get('/ofStudysession/:studysessionId/createdBy/:userId/', getBookingsOfStudysessionCreatedByUser);
router.put('/:bookingId', updateBooking);
router.delete('/:bookingId', deleteBooking);
router.put('/confirmBooking/:bookingId', confirmBooking);
router.put('/payBooking/:bookingId', setBookingIsPayed);
router.get('/bookingsOfTutor/:userId', getBookingsOfTutor);
router.post('/createBooking', createBooking);

export default router;