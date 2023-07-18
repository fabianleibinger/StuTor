import express from "express";
import {
  createBooking,
  getBooking,
  getBookingsOfStudysession,
  getBookingsCreatedByUser,
  getBookingsOfStudysessionCreatedByUser,
  updateBooking,
  deleteBooking,
  confirmBooking,
  setBookingIsPayed,
  getBookingsOfTutor,
  acceptBooking,
} from "../controllers/BookingController.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.post("/", verifyToken, createBooking);
router.get("/id/:bookingId", verifyToken, getBooking);
router.get(
  "/ofStudysession/:studysessionId",
  verifyToken,
  getBookingsOfStudysession
);
router.get("/createdBy/:userId", verifyToken, getBookingsCreatedByUser);
router.get(
  "/ofStudysession/:studysessionId/createdBy/:userId/",
  verifyToken,
  getBookingsOfStudysessionCreatedByUser
);
router.put("/:bookingId", verifyToken, updateBooking);
router.delete("/:bookingId", verifyToken, deleteBooking);
router.put("/confirmBooking/:bookingId", verifyToken, confirmBooking);
router.put("/payBooking/:bookingId", verifyToken, setBookingIsPayed);
router.get("/bookingsOfTutor/:userId", verifyToken, getBookingsOfTutor);
router.post("/createBooking", verifyToken, createBooking);
router.put("/acceptBooking/:bookingId", verifyToken, acceptBooking);

export default router;
