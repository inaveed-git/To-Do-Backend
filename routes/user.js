import express from 'express'; // Import the Express framework
import { login, logout, register, getMyProfile } from '../controllers/user.js'; // User controller functions
import isAuthenticated from '../middleware/auth.js'; // Authentication middleware
import wrapAsync from '../middleware/wrapAsync.js'; // Middleware to handle async errors

const router = express.Router(); // Create a new router

// Route to register a new user, with async error handling
router.post("/register", wrapAsync(register));

// Route to log in a user, with async error handling
router.post("/login", wrapAsync(login));

// Route to get the authenticated user's profile
router.get("/me", isAuthenticated, getMyProfile);

// Route to log out the user
router.get("/logout", logout);

export default router; // Export the router
