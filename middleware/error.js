// Custom error handler class extending the native Error class
class ErrorHandler extends Error {
    constructor(message, status) {
        super(message); // Call the parent class constructor
        this.status = status; // Set the HTTP status code for the error
    }
}

// Middleware function to handle errors
export const errorMiddleware = (err, req, res, next) => {
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "An unexpected error occurred", // Return the error message
    });
};

export default ErrorHandler; // Export the ErrorHandler class
