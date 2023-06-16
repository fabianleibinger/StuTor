import express from 'express';
import { createReview, getReview, getReviewOfBooking, deleteReview } from '../controllers/ReviewController.js';

const router = express.Router();

router.post('/', createReview);
router.get('/id/:reviewId', getReview);
router.get('/ofBooking/:bookingId', getReviewOfBooking);
router.delete('/:reviewId', deleteReview);

export default router;