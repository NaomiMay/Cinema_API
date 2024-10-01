import mongoose from "mongoose";
const Schema = mongoose.Schema;

const movieListingSchema = new mongoose.Schema({
  listingID: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  director: { type: String, required: true },
  duration: { type: String, required: true },
  date: { type: String, required: true },
  day: { type: String, required: true },
  time: { type: String, required: true },
  price: { type: Number, required: true },
});

const MovieListing = mongoose.model("MovieListing", movieListingSchema);
export default MovieListing; //Decided to use ES6 syntax here
