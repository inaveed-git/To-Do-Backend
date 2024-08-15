import User from '../models/user.js'; // Import the User model
import bcrypt from 'bcrypt'; // Import bcrypt for password hashing
import { sendCookie } from '../utils/cookie.js'; // Utility function to send cookies
import ErrorHandler from '../middleware/error.js'; // Error handling middleware

// Controller to register a new user
export const register = async (req, res, next) => {
    const { name, email, password } = req.body;

    // Check if user already exists
    let existingUser = await User.findOne({ email });
    if (existingUser) return next(new ErrorHandler("User already exists", 400));

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    // Send a cookie with the response
    sendCookie(newUser, res, "User registered successfully", 201);
};

// Controller to log in a user
export const login = async (req, res, next) => {
    const { email, password } = req.body;

    // Find the user by email and include the password field
    const user = await User.findOne({ email }).select("+password");
    if (!user) return next(new ErrorHandler("User not found", 404));

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return next(new ErrorHandler("Invalid email or password", 400));

    // Send a cookie with the response
    sendCookie(user, res, "Logged in successfully", 200);
};

// Controller to get the authenticated user's profile
export const getMyProfile = (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user,
    });
};

// Controller to log out the user
export const logout = (req, res) => {
    res
        .status(200)
        .cookie("token", "", {
            expires: new Date(Date.now()), // Set cookie expiration to the past to log out
        })
        .json({
            success: true,
            message: "Logged out successfully",
        });
};
