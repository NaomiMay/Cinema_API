import MovieListing from "../models/MovieListing.js";

////Functions

//GET all movie listings
const getAllListings = async (req, res) => {
  try {
    const listings = await MovieListing.find(); // Finding all movie listings in the datatbase
    res.json(listings); // send response of listings in JSON format
  } catch (error) {
    res.status(500).json({
      // If error happens during query
      message: "Server error, we could not get all movie listings",
      error: error.message,
    });
  }
};

//GET a movie listing by it ID
const getListingByID = async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await MovieListing.findOne({ listingID: id }); // looks for listing by its ID in the database
    if (!listing) {
      return res
        .status(404)
        .json({ message: "Sorry, listing could not be found." });
    }
    res.json(listing); //Response with the listing matching ID
  } catch (error) {
    res.status(500).json({
      message: "Server error, we could not get the requested listing",
      error: error.message,
    }); // Not a valid request
  }
};

// GET a movie listing by date
const getListingByDate = async (req, res) => {
  try {
    const date = req.params.date;
    const listings = await MovieListing.find({ date }); // looks for listing by date in the database
    if (listings.length === 0) {
      return res
        .status(404)
        .json({ message: "Sorry, date for this listing could not be found." });
    }
    res.json(listing); //Response with the listing matching date
  } catch (error) {
    res.status(500).json({
      message: "Server error, we could not get the requested  date listings",
      error: error.message,
    });
  }
};

//POST create a new movie listing on database
const createMovieListing = async (req, res) => {
  try {
    const { listingID, title, director, duration, date, day, time, price } =
      req.body; // extracts movie listing data from the request body
    // validates
    if (
      !listingID ||
      !title ||
      !director ||
      !duration ||
      !date ||
      !day ||
      !time ||
      !price
    ) {
      return res
        .status(400)
        .json({ message: "All feilds are required please enter all feilds" });
    }
    //Creates a new movie listing document
    const newListing = new MovieListing({
      listingID,
      title,
      director,
      duration,
      date,
      day,
      time,
      price,
    });
    //Saves the new movie listing to the database
    const savedListing = await newListing.save();

    //Response of new saved movie listing
    res.status(201).json(savedListing);
  } catch (error) {
    res.status(500).json({
      message: "Server error, sorry could not create a new movie listing",
      error: error.message,
    });
  }
};

// PUT update/replace a piece of movie listing data using listingID
export const updateListingDetails = async (req, res) => {
  try {
    const { id } = req.params; // getting the movie listing ID from route parameters
    const replaceData = req.body; // gets data from the body request to update

    // Validate one field at least as provided, else return the error 400
    if (!replaceData || Object.keys(replaceData).length === 0) {
      return res
        .status(400)
        .json({ message: "No data has been provided to update/replace data" });
    }
    console.log("Updating listing with ID:", id);
    console.log("Data to update:", replaceData);

    // Find the listing by listingID and update it
    const updatedListing = await MovieListing.findOneAndUpdate(
      { listingID: id }, // Ensure this uses listingID to find the document
      replaceData,
      { new: true } // This returns the updated document
    );

    // If listing isn't found please return the 404 error message
    if (!updatedListing) {
      return res
        .status(404)
        .json({ message: "Sorry! Movie listing could not be found" });
    }

    // Else respond with successfully updated movie message
    res.status(200).json({
      message: "Movie listing data was updated successfully",
      data: updatedListing,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error, could not update the movie listing data",
      error: error.message,
    });
  }
};

//DELETE a movie listing document in the database collection using ID
export const deleteMovieListing = async (req, res) => {
  try {
    const { id } = req.params; // getting the movie ID from route pamameters

    //retrieve movie listing by given ID and delete it
    const deletedMovieListing = await MovieListing.findByIdAndDelete(id);

    //If the listing isn't found return error message 404
    if (!deletedMovieListing) {
      return res
        .status(404)
        .json({ message: "Sorry! Movie listing could not be found" });
    }
    //Else respond with succesfull message
    res.status(200).json({ message: "Movie listing was deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Server error, could not delete the movie listing",
      error: error.message,
    });
  }
};

const movieListingController = {
  getAllListings,
  getListingByID,
  getListingByDate,
  createMovieListing,
  updateListingDetails,
  deleteMovieListing,
};

export default movieListingController;
