import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userID: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: Number, required: true, unique: true },
  email: { type: String, required: true, unique: true }, //Hoping string is the right data type to use!
});

const User = mongoose.model("User", userSchema);

export default User; //Decided to use ES6 syntax here
