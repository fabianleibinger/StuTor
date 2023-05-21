import Booking from '../models/Booking.js';
import StudySession from '../models/StudySession.js';
import User from '../models/User.js';
import { ObjectId } from 'mongodb';

export const createBooking = async (req, res) => {
    try {
        // Check if studysession exists.
        const studySessionId = new ObjectId(req.body.studySession);
        const studySession = await StudySession.findById(studySessionId);
        if (!studySession) {
            res.status(404).send('Object reference not found!');
            return;
        }
        // Check if user exists.
        const userId = new ObjectId(req.body.createdBy);
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).send('Object reference not found!');
            return;
        }
        // Create booking.
        const newBooking = new Booking({
            studySession: studySessionId,
            hours: req.body.hours,
            priceEuro: req.body.priceEuro,
            createdAt: Date.now(),
            createdBy: userId,
        });
        try {
            const savedBooking = await newBooking.save();
            res.status(201).send(savedBooking);
        } catch (err) {
            res.status(500).send('Failed to create booking!');
        }
    } catch (err) {
        res.status(400).send('Bad request!');
    }
};

export const getBooking = async (req, res) => {
    try {
        const bookingId = new ObjectId(req.params.id);
        const booking = await Booking.findById(bookingId);
        try {
            if (!booking) {
                res.status(404).send('Object not found!');
            } else {
                res.status(200).send(booking);
            }
        } catch (err) {
            res.status(500).send('Failed to retrieve booking!');
        }
    } catch (err) {
        res.status(400).send('Bad request!');
    }
}

export const updateBooking = async (req, res) => {
    try {
        // Check if studysession exists.
        const studySessionId = new ObjectId(req.body.studySession);
        const studySession = await StudySession.findById(studySessionId);
        if (!studySession) {
            res.status(404).send('Object reference not found!');
            return;
        }
        // Check if user exists.
        const userId = new ObjectId(req.body.createdBy);
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).send('Object reference not found!');
            return;
        }
        // Update booking.
        const bookingId = new ObjectId(req.params.bookingId);
        const updatedBooking = new Booking({
            studySession: studySessionId,
            hours: req.body.hours,
            priceEuro: req.body.priceEuro,
            createdBy: userId,
        });
        try {
            const booking = await Booking.findByIdAndUpdate(bookingId,
                {
                    studySession: updatedBooking.studySession,
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

export const deleteBooking = async (req, res) => {
    try {
        const bookingId = new ObjectId(req.params.id);
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