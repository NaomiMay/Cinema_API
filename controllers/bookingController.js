import Booking from "../models/Booking.js";

////Functions

// GET booking details along with movie information
export const getAllBookings = async (req, res) => {
  try {
    //Get the all bookings and populate movie details
    const bookings = await Booking.find().populate({
      // "Populates" 'title' with the MovieListing document data selected (select x, y, z)
      path: "title",
      select: "title date day time duration",
    });

    res.json(bookings); // send response of bookings in JSON format
  } catch (error) {
    res.status(500).json({
      message: "Server error, could not get requested bookings",
      error: error.message,
    });
  }
};

//GET booking by ID
const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findOne({ bookingID: id }).populate("title");
    if (!booking) {
      return res
        .status(404)
        .json({ message: "Sorry, booking could not be found." }); // Not a valid request
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({
      message: "Server error, could not get requested bookings",
      error: error.message,
    });
  }
};

// GET booking by userID
const getBookingByUser = async (req, res) => {
  try {
    const userID = req.params.userID;
    const bookings = await Booking.find({ userID }); // looks for booking by userID
    if (!bookings || bookings.length === 0) {
      return res
        .status(404)
        .json({ message: "Sorry, booking could not be found." });
    }
    res.json(bookings);
  } catch (error) {
    res.status(500).json({
      message: "Server error, could not get requested user bookings",
      error: error.message,
    });
  }
};

//POST create a new booking on database
const createBooking = async (req, res) => {
  try {
    const { bookingID, userID, seatNumber, title, price } = req.body; // extracts booking data from the request body
    // validates
    if (!bookingID || !userID || !seatNumber || !title || !price) {
      return res
        .status(400)
        .json({ message: "All fields are required please enter all feilds" });
    }
    //Creates a new booking document
    const newBooking = new Booking({
      bookingID,
      userID,
      seatNumber,
      title,
      price,
    });
    //Saves the new booking to the database
    const savedBooking = await newBooking.save();

    //Response of new saved booking
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(500).json({
      message: "Server error, sorry could not create new booking",
      error: error.message,
    });
  }
};

//PUT update/replace a piece of booking data
export const updateBookingDetails = async (req, res) => {
  try {
    const { id } = req.params; // getting the booking ID from route pamameters
    const replaceData = req.body; // gets data from the body request to update

    // Validate one field at least as provided, else return the error 400
    if (!replaceData || Object.keys(replaceData).length === 0) {
      return res
        .status(400)
        .json({ message: "No data has been provided to update/replace data" });
    }
    //Find the booking and update it
    const updatedBooking = await Booking.findByIdAndUpdate(id, replaceData, {
      new: true,
    });

    //If booking isn't found please return the 404 error message
    if (!updatedBooking) {
      return res
        .status(404)
        .json({ message: `Sorry! Booking ${id} could not found` });
    }
    //Else respond with successfully updated booking message
    res.status(200).json({ message: "Booking data was updated successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Server error, could not update the booking data",
      error: error.message,
    });
  }
};

//DELETE a booking document in the database collection using ID
export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params; // getting the booking ID from route pamameters

    //retrieve the booking by given ID and delete it
    const deletedBooking = await Booking.findByIdAndDelete(id);

    //If the booking isn't found return error message 404
    if (!deletedBooking) {
      return res
        .status(404)
        .json({ message: `Sorry! Booking ${id} could not be found` });
    }
    //Else respond with succesfull message
    res.status(200).json({ message: "Booking was deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Server error, could not delete this booking",
      error: error.message,
    });
  }
};

const bookingController = {
  getAllBookings,
  getBookingById,
  getBookingByUser,
  createBooking,
  updateBookingDetails,
  deleteBooking,
};
export default bookingController;
