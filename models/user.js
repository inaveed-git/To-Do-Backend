import mongoose from 'mongoose'; // Import Mongoose for MongoDB operations

// Define the User schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // Name is required
    },
    email: {
        type: String,
        unique: true, // Email must be unique
        required: true, // Email is required
    },
    password: {
        type: String,
        required: true, // Password is required
        select: false, // Do not include password in queries by default
    },
    createdAt: {
        type: Date,
        default: Date.now, // Set the default creation date
    },
});

// Create the User model from the schema
const User = mongoose.model("User", userSchema);

export default User; // Export the User model
