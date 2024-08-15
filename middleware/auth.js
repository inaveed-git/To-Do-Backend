import User from "../models/user.js"; // Import the User model
import jwt from "jsonwebtoken"; // Import JSON Web Token for authentication

// Middleware function to check if the user is authenticated
const isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies; // Extract the token from cookies

    // If no token is provided, return a 401 Unauthorized status
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Please log in to access this resource.",
        });
    }

    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by the ID stored in the token
    req.user = await User.findById(decoded._id);

    if (!req.user) {
        return res.status(404).json({
            success: false,
            message: "User not found. Please log in again.",
        });
    }

    next(); // Proceed to the next middleware or route handler
};

export default isAuthenticated; // Export the isAuthenticated middleware
