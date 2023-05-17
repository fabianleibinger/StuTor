import Schema from 'mongoose';

const ReviewSchema = new Schema({
    booking: {
        type: Schema.Types.ObjectId,
        ref: 'Booking',
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    feedback: {
        type: String,
    },
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;