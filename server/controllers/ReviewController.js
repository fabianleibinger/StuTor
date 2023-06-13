import Booking from '../models/Booking.js';
import Review from '../models/Review.js';
import { ObjectId } from 'mongodb';

export const createReview = async (req, res) => {
  try {
    // Check if review for booking exists already.
    const existingReview = await Review.findOne({
      booking: req.body.booking,
    });
    if (existingReview) {
      res.status(409).send('Review already exists for booking!');
      return;
    }
    // Check if booking exists.
    const bookingId = new ObjectId(req.body.booking);
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      res.status(404).send('Object reference not found!');
      return;
    }
    // Create review.
    const newReview = new Review({
      booking: bookingId,
      rating: req.body.rating,
      feedback: req.body.feedback,
    });
    try {
      const savedReview = await newReview.save();
      res.status(201).send(savedReview);
    } catch (err) {
      res.status(500).send('Failed to create review!');
    }
  } catch (err) {
    res.status(400).send('Bad request!');
  }
};

export const getReview = async (req, res) => {
  try {
    const reviewId = new ObjectId(req.params.reviewId);
    const review = await Review.findById(reviewId);
    try {
      if (!review) {
        res.status(404).send('Review not found!');
      } else {
        res.status(200).send(review);
      }
    } catch (err) {
      res.status(500).send('Failed to retrieve review!');
    }
  } catch (err) {
    res.status(400).send('Bad request!');
  }
};

export const getReviewOfBooking = async (req, res) => {
  try {
    const bookingId = new ObjectId(req.params.bookingId);
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      res.status(404).send('Object reference not found!');
      return;
    }
    const review = await Review.findOne({ booking: bookingId });
    try {
      if (!review) {
        res.status(404).send('Review not found!');
      } else {
        res.status(200).send(review);
      }
    } catch (err) {
      res.status(500).send('Failed to retrieve review!');
    }
  } catch (err) {
    res.status(400).send('Bad request!');
  }
};

export const getAverageRatingForTutor = async (req, res) => {
  // dummy implementation
  res.status(200, 4);
};

export const deleteReview = async (req, res) => {
  try {
    const reviewId = new ObjectId(req.params.reviewId);
    try {
      const review = await Review.findByIdAndDelete(reviewId);
      if (!review) {
        res.status(404).send('Review not found!');
      } else {
        await review.delete();
        res.status(200).send('Review deleted!');
      }
    } catch (err) {
      res.status(500).send('Failed to delete review!');
    }
  } catch (err) {
    res.status(400).send('Bad request!');
  }
};