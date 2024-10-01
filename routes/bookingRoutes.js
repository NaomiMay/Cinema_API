import express from "express";
const router = express.Router();
import bookingController from "../controllers/bookingController.js";

// GET all bookings
router.get("/", bookingController.getAllBookings);

// GET all bookings by userID
router.get("/user/:userID", bookingController.getBookingByUser);

// GET all bookings by ID
router.get("/:id", bookingController.getBookingById);

// POST a new booking route
router.post("/", bookingController.createBooking);

// PUT to update a booking
router.put("/:id", bookingController.updateBookingDetails);

// DELETE a booking
router.delete("/:id", bookingController.deleteBooking);

export default router;
