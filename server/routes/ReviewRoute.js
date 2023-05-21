import express from 'express';
import { createReview, getReview, deleteReview } from '../controllers/ReviewController.js';

const router = express.Router();

router.post('/', createReview);
router.get('/:reviewId', getReview);
router.delete('/:reviewId', deleteReview);

export default router;