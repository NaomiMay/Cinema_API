import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  bookingID: { type: Number, required: true, unique: true },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to User model
    required: true,
  }, //No longer unique as userID can have many bookings?
  seatNumber: { type: String, required: true },
  title: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MovieListing",
    required: true,
  }, // Reference to MovieListing model, will have to use .populate() for displaing all other data of movie.
  price: { type: Number, required: true },
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking; //Decided to use ES6 syntax here
