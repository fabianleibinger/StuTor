import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import {
  createReview,
  getReview,
  getReviewOfBooking,
  deleteReview,
} from "../controllers/ReviewController.js";

const router = express.Router();

router.post("/", verifyToken, createReview);
router.get("/id/:reviewId", verifyToken, getReview);
router.get("/ofBooking/:bookingId", verifyToken, getReviewOfBooking);
router.delete("/:reviewId", verifyToken, deleteReview);

export default router;
