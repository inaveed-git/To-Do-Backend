import 'dotenv/config'; // Load environment variables from .env file
import express from 'express'; // Express framework for building APIs
import connectDB from './Database/config.js'; // Database connection setup
import userRouter from './routes/user.js'; // User routes
import taskRouter from './routes/task.js'; // Task routes
import cookieParser from 'cookie-parser'; // Middleware for handling cookies
import { errorMiddleware } from './middleware/error.js'; // Custom error handling middleware

const app = express(); // Initialize Express application

connectDB(); // Connect to the database

app.use(express.json()); // Middleware to parse JSON bodies in requests
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies in requests
app.use(cookieParser()); // Middleware to parse cookies in requests

// Root route to confirm server is running
app.get("/", (req, res) => {
    res.send({
        msg: "You are entering"
    });
});

// User routes handling
app.use("/api/v1/users", userRouter);

// Task routes handling
app.use("/api/v1/task", taskRouter);

// Define the port using environment variable or default to 8080
const PORT = process.env.PORT || 8080;

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Use custom error handling middleware for centralized error handling
app.use(errorMiddleware);
