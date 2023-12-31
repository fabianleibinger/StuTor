import mongoose from "mongoose";
const { Schema } = mongoose;

const ReviewSchema = new Schema({
  booking: {
    type: Schema.Types.ObjectId,
    ref: "Booking",
    required: true,
    unique: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  feedback: {
    type: String,
  },
});

const Review = mongoose.model("Review", ReviewSchema);

export default Review;
