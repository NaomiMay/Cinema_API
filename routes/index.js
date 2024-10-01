import express from "express";
const router = express.Router();
// Importing route files
import userRoutes from "./userRoutes.js";
import bookingRoutes from "./bookingRoutes.js";
import movieListingRoutes from "./movieListingRoutes.js";

// Use the imported routes here
router.use("/users", userRoutes); // All user-related routes will be prefixed with /users
router.use("/bookings", bookingRoutes); // All booking-related routes will be prefixed with /bookings
router.use("/movies", movieListingRoutes); // All movie-related routes will be prefixed with /movies

export default router;
