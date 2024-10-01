import User from "../models/User.js";

////Functions

// GET all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Finding all users in the datatbase
    res.json(users); // send response of users in JSON format
  } catch (error) {
    res.status(500).json({
      // If error happens during query
      message: "Server error, we could not get all users",
      error: error.message,
    });
  }
};

//GET a user by userID
const getUserByID = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ userID: id }); // looks for user by its ID in the database
    if (!user) {
      return res
        .status(404)
        .json({ message: "Sorry, user could not be found." });
    }
    res.json(user); //Response with the user matching ID
  } catch (error) {
    res.status(500).json({
      message: "Server error, we could not get the requested user",
      error: error.message,
    }); // Not a valid request
  }
};

// GET user by last name
const getUserByLastName = async (req, res) => {
  try {
    const lastName = req.params.lastName;
    const user = await User.find({ lastName }); // looks for user ny last name
    if (user.length === 0) {
      return res.status(404).json({
        message: "Sorry, no user with this last name could be found.",
      });
    }
    res.json(user); //Response with the user matching last name
  } catch (error) {
    res.status(500).json({
      message: "Server error, we could not get the requested last name user",
      error: error.message,
    });
  }
};

//POST create a new user on the database
const createUser = async (req, res) => {
  try {
    const { userID, firstName, lastName, phone, email } = req.body; // extracts user data from the request body
    // validates
    if (!userID || !firstName || !lastName || !phone || !email) {
      return res
        .status(400)
        .json({ message: "All fields are required please enter all feilds" });
    }
    //Creates a new user document
    const newUser = new User({
      userID,
      firstName,
      lastName,
      phone,
      email,
    });
    //Saves the new user to the database
    const savedUser = await newUser.save();

    //Response of a new saved user
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({
      message: "Server error, sorry could not create new a user",
      error: error.message,
    });
  }
};

//PUT update/replace a piece of user data
export const updateUserDetails = async (req, res) => {
  try {
    const { id } = req.params; // getting the user ID from route pamameters
    const replaceData = req.body; // gets data from the body request to update

    // Validate one field at least as provided, else return the error 400
    if (!replaceData || Object.keys(replaceData).length === 0) {
      return res
        .status(400)
        .json({ message: "No data has been provided to update/replace data" });
    }
    //Find the user and update it
    const updatedUser = await User.findByIdAndUpdate(id, replaceData, {
      new: true,
    });

    //If user isn't found please return the 404 error message
    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: `Sorry! User ${id} could not be found` });
    }
    //Else respond with successfully updated user message
    res.status(200).json({ message: "User data was updated successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Server error, could not update the user data",
      error: error.message,
    });
  }
};

//DELETE a user document in the database collection using ID
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params; // getting the user ID from route pamameters

    //retrieve the user by given ID and delete it
    const deletedUser = await User.findByIdAndDelete(id);

    //If the user isn't found return error message 404
    if (!deletedUser) {
      return res
        .status(404)
        .json({ message: `Sorry! User ${id} could not be found` });
    }
    //Else respond with succesfull message
    res.status(200).json({ message: "User was deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Server error, could not delete this user",
      error: error.message,
    });
  }
};

const userController = {
  getAllUsers,
  getUserByID,
  getUserByLastName,
  createUser,
  updateUserDetails,
  deleteUser,
};

export default userController;
