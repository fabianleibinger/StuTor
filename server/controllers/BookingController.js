import Stripe from 'stripe';
import Booking from '../models/Booking.js';
import Studysession from '../models/Studysession.js';
import User from '../models/User.js';
import { ObjectId } from 'mongodb';
import Review from '../models/Review.js';

const stripe = new Stripe('sk_test_51NHAGjBuAoJ2w5QopNPNnAdWTlA43tOCFfgKofUN2CUKOJArtX9KoKqcbMH5c1VTPl9RvBpTelUnnnmL72RBF2OG00YCMEmF01');

export const createBooking = async (req, res) => {
    try {
        // Check if studysession and user exist.
        const studysessionId = new ObjectId(req.body.studysession);
        const studysession = await Studysession.findById(studysessionId);
        const userId = new ObjectId(req.body.createdBy);
        const user = await User.findById(userId);
        if (!studysession || !user) {
            res.status(404).send('Object reference not found!');
            return;
        }
        // Create booking.
        const newBooking = new Booking({
            studysession: studysessionId,
            hours: req.body.hours,
            priceEuro: req.body.priceEuro,
            createdAt: Date.now(),
            createdBy: userId,
        });
        try {
            const savedBooking = await newBooking.save();
            res.status(201).send(savedBooking);
        } catch (err) {
            console.log(err);
            res.status(500).send('Failed to create booking!');
        }
    } catch (err) {
        res.status(400).send('Bad request!');
    }
};

export const getBooking = async (req, res) => {
    try {
        const bookingId = new ObjectId(req.params.bookingId);
        console.log(bookingId)
        const booking = await Booking.findById(bookingId);
        console.log(booking)
        try {
            if (!booking) {
                res.status(404).send('Booking not found!');
            } else {
                res.status(200).send(booking);
            }
        } catch (err) {
            res.status(500).send('Failed to retrieve booking!');
        }
    } catch (err) {
        res.status(400).send('Bad request!');
    }
};

export const setBookingIsPayed = async (req, res) => {
    try {
        const bookingId = new ObjectId(req.params.bookingId);
        const booking = await Booking.findById(bookingId);
        const session = await stripe.checkout.sessions.retrieve(booking.paymentSession);
        if (session.payment_status !== 'paid') {
            await Booking.findByIdAndDelete(bookingId);
            res.status(400).send('Payment not completed!');
        }
        const updatedBooking = await Booking.findByIdAndUpdate(bookingId,
            {
                isPayed: true,
            });
        if (!booking) {
            res.status(404).send('Booking not found!');
        } else if (updatedBooking) {
            res.status(200).send('Booking is payed!');
        }
    } catch (err) {
        console.log(err);
        res.status(406).send('Failed to set booking to payed!');
    }
};

export const getBookingsOfStudysession = async (req, res) => {
    try {
        // Check if studysession exists.
        const studysessionId = new ObjectId(req.params.studysessionId);
        const studysession = await Studysession.findById(studysessionId);
        if (!studysession) {
            res.status(404).send('Object reference not found!');
            return;
        }
        const bookings = await Booking.find({ studysession: studysessionId });
        try {
            if (bookings.length === 0) {
                res.status(404).send('No bookings found!');
            } else {
                res.status(200).send(bookings);
            }
        } catch (err) {
            res.status(500).send('Failed to retrieve bookings!');
        }
    } catch (err) {
        res.status(400).send('Bad request!');
    }
};

export const getBookingsCreatedByUser = async (req, res) => {
    try {
        // Check if user exists.
        const userId = new ObjectId(req.params.userId);
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).send('Object reference not found!');
            return;
        }
        const bookings = await Booking.find({ createdBy: userId });
        try {
            if (bookings.length === 0) {
                res.status(404).send('No bookings found!');
            } else {
                res.status(200).send(bookings);
            }
        } catch (err) {
            res.status(500).send('Failed to retrieve bookings!');
        }
    } catch (err) {
        res.status(400).send('Bad request!');
    }
};

export const getBookingsOfStudysessionCreatedByUser = async (req, res) => {
    try {
        // Check if studysession and user exist.
        const studysessionId = new ObjectId(req.params.studysessionId);
        const studysession = await Studysession.findById(studysessionId);
        const userId = new ObjectId(req.params.userId);
        const user = await User.findById(userId);
        if (!studysession || !user) {
            res.status(404).send('Object reference not found!');
            return;
        }
        const bookings = await Booking.find(
            { 
                studysession: studysessionId, 
                createdBy: userId, 
            });
        try {
            if (bookings.length === 0) {
                res.status(404).send('No bookings found!');
            } else {
                res.status(200).send(bookings);
            }
        } catch (err) {
            res.status(500).send('Failed to retrieve bookings!');
        }
    } catch (err) {
        res.status(400).send('Bad request!');
    }
};

export const getBookingsOfTutor = async (req, res) => {
    try {
        // Check if user exists.
        const userId = new ObjectId(req.params.userId);
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).send('Object reference not found!');
            return;
        }
        const studysessions = await Studysession.find({ tutoredBy: userId });
        if (studysessions.length === 0) {
            res.status(404).send('No studysessions found!');
            return;
        }
        const studysessionIds = studysessions.map(session => session._id);
        const bookings = await Booking.find({ studysession: { $in: studysessionIds } })
        .populate('studysession')
        .populate({
            path: 'studysession', 
            populate: {
                path: 'course',
                model: 'Course'
            } 
          })
        .populate('createdBy');

        console.log("bookings", bookings)

        // Find the booking ids
        const bookingIds = bookings.map(booking => booking._id);

        // Find the reviews corresponding to the booking ids
        const reviews = await Review.find({ booking: { $in: bookingIds } });
        console.log(reviews)
        console.log("response", {bookings, reviews})
        try {
            if (bookings.length === 0) {
                res.status(404).send('No bookings found!');
            } else {
                res.status(200).send({bookings, reviews});
            }
        } catch (err) {
            res.status(500).send('Failed to retrieve bookings!');
        }
    } catch (err) {
        console.log(err);
        res.status(400).send('Bad request!');
    }
};


export const updateBooking = async (req, res) => {
    try {
        // Check if studysession and user exist.
        const studysessionId = new ObjectId(req.body.studysession);
        const studysession = await Studysession.findById(studysessionId);
        const userId = new ObjectId(req.body.createdBy);
        const user = await User.findById(userId);
        if (!studysession || !user) {
            res.status(404).send('Object reference not found!');
            return;
        }
        // Update booking.
        const bookingId = new ObjectId(req.params.bookingId);
        const updatedBooking = new Booking({
            studysession: studysessionId,
            hours: req.body.hours,
            priceEuro: req.body.priceEuro,
            createdBy: userId,
        });
        try {
            const booking = await Booking.findByIdAndUpdate(bookingId,
                {
                    studysession: updatedBooking.studysession,
                    hours: updatedBooking.hours,
                    priceEuro: updatedBooking.priceEuro,
                    createdBy: updatedBooking.createdBy,
                });
            if (!booking) {
                res.status(404).send('Booking not found!');
            } else {
                res.status(200).send(updatedBooking);
            }
        } catch (err) {
            res.status(500).send('Failed to update booking!');
        }
    } catch (err) {
        res.status(400).send('Bad request!');
    }
};

export const confirmBooking = async (req, res) => {
    try {
        const bookingId = new ObjectId(req.params.bookingId);
        const booking = await Booking.findByIdAndUpdate(bookingId,
            {
                isConfirmed: true,
            });
        if (!booking) {
            res.status(404).send('Booking not found!');
        } else {
            res.status(200).send('Booking confirmed!');
        }
    } catch (err) {
        res.status(500).send('Failed to confirm booking!');
    }  
};

export const acceptBooking = async (req, res) => {
    try {
        const bookingId = new ObjectId(req.params.bookingId);
        const booking = await Booking.findByIdAndUpdate(bookingId,
            {
                isAcceptedByTutor: true,
            });
        if (!booking) {
            res.status(404).send('Booking not found!');
        } else {
            res.status(200).send('Booking accepted!');
        }
    } catch (err) {
        res.status(500).send('Failed to accept booking!');
    }
};


export const deleteBooking = async (req, res) => {
    try {
        const bookingId = new ObjectId(req.params.bookingId);
        try {
            const booking = await Booking.findByIdAndDelete(bookingId);
            if (!booking) {
                res.status(404).send('Booking not found!');
            } else {
                res.status(200).send('Booking deleted!');
            }
        } catch (err) {
            res.status(500).send('Failed to delete booking!');
        }
    } catch (err) {
        res.status(400).send('Bad request!');
    }
};