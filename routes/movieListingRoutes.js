import express from "express";
const router = express.Router();
import movieListingController from "../controllers/movieListingController.js";

// GET all movie listings route
router.get("/", movieListingController.getAllListings);

// GET a movie listing by ID route
router.get("/:id", movieListingController.getListingByID);

// GET movie listings by date route
router.get("/date/:date", movieListingController.getListingByDate);

// POST a new movie listing route
router.post("/", movieListingController.createMovieListing);

// PUT to update a movie listing by ID route
router.put("/:id", movieListingController.updateListingDetails);

// DELETE a movie listing by ID route
router.delete("/:id", movieListingController.deleteMovieListing);

export default router;
