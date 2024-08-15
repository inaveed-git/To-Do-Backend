import express from 'express'; // Import the Express framework
import { newTask, getTask, deleteTask, updateTask } from '../controllers/task.js'; // Task controller functions
import isAuthenticated from '../middleware/auth.js'; // Authentication middleware
import wrapAsync from '../middleware/wrapAsync.js'; // Middleware to handle async errors

const router = express.Router(); // Create a new router

// Route to get tasks associated with the authenticated user
router.get("/my", isAuthenticated, getTask);

// Route to create a new task, with authentication and async error handling
router.post("/new", isAuthenticated, wrapAsync(newTask));

// Route to update or delete a task by its ID, with authentication
router.route("/:id")
    .put(isAuthenticated, updateTask) // Update task
    .delete(isAuthenticated, deleteTask); // Delete task

export default router; // Export the router
