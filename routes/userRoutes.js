import express from "express";
const router = express.Router();
import userController from "../controllers/userController.js";

// GET all users
router.get("/", userController.getAllUsers);

// GET all users by ID
router.get("/:id", userController.getUserByID);

// GET all users by last name
router.get("/lastName/:lastName", userController.getUserByLastName);

// POST a new user route
router.post("/", userController.createUser);

// PUT to update a user route
router.put("/:id", userController.updateUserDetails);

// DELETE a user
router.delete("/:id", userController.deleteUser);

export default router;
