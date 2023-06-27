import mongoose from 'mongoose';
const { Schema } = mongoose;

const BookingSchema = new Schema({
    studysession: {
        type: Schema.Types.ObjectId,
        ref: 'Studysession',
        required: true,
    },
    hours: {
        type: Number,
        required: true,
    },
    priceEuro: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    isConfirmed: {
        type: Boolean,
        required: false,
        default: false,
    },
    reviewGiven: {
        type: Boolean,
        required: false,
        default: false,
    },
});

const Booking = mongoose.model('Booking', BookingSchema);

export default Booking;