import jwt from 'jsonwebtoken'; // Import JSON Web Token for generating and verifying tokens

// Function to generate and send a JWT as a cookie
export const sendCookie = (user, res, message, statusCode = 200) => {
    // Create a JWT token with the user's ID and a secret key
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '15m', // Token expires in 15 minutes
    });

    // Set the token as a cookie in the response
    res
        .status(statusCode) // Set the HTTP status code
        .cookie("token", token, {
            httpOnly: true, // Make the cookie accessible only through the HTTP protocol
            maxAge: 15 * 60 * 1000, // Set the cookie to expire in 15 minutes
            // sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none", // SameSite policy based on environment
            // secure: process.env.NODE_ENV !== "Development", // Set secure flag in production
        })
        .json({
            success: true, // Indicate success
            message, // Send a custom message
        });
};
