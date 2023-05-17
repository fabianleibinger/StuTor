import Schema from 'mongoose';

const BookingSchema = new Schema({
    studySession: {
        type: Schema.Types.ObjectId,
        ref: 'StudySession',
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
        type: Datetime,
        required: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const Booking = mongoose.model('Booking', BookingSchema);

module.exports = Booking;