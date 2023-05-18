import express from "express";
import {
  createReview,
  getReviews,
  deleteReview,
} from "../controllers/ReviewController.js";

const router = express.Router();

router.post("/", createReview )
router.get("/:bookingId", getReviews )
router.delete("/:id", deleteReview)
router.get("/test", (req, res) => res.send("test") )

export default router;