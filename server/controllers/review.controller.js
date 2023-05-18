import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import createError from "../utils/createError.js";
import Review from "../models/Review.js";
import Booking from "../models/Booking.js";

export const createReview = async (req, res, next) => {
// cannot add reference to booking yet, this is just a dummy id
  const newReview = new Review({
    booking: new ObjectId("646645833af025dcdb688b97"),//Booking.findOne({_id: new ObjectId(req.params.bookingId)})._id,
    rating: req.body.rating,
    feedback: req.body.feedback,
  });

  try {
    const review = await Review.findOne({
        booking: req.bookingId,
    });

    if (review)
      return next(
        createError(403, "You have already created a review for this gig!")
      );
    
    //TO DO: Check more?
    const savedReview = await newReview.save();
    res.status(201).send(savedReview);
  } catch (err) {
    next(err);
  }
};

export const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ reviewId: req.params.reviewId });
    res.status(200).send(reviews);
  } catch (err) {
    next(err);
  }
};
export const deleteReview = async (req, res, next) => {
  try {
    Review.findByIdAndDelete(req.params.reviewId);
    res.status(200).send("deleted.");
  } catch (err) {
    next(err);
  }
};