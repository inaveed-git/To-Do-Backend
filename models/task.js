import mongoose from 'mongoose'; // Import Mongoose for MongoDB operations

// Define the Task schema
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true, // Title is required
    },
    description: {
        type: String,
        required: true, // Description is required
    },
    isCompleted: {
        type: Boolean, // Corrected type to Boolean
        default: false, // Default value for task completion
        select: false, // Do not select this field by default
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the User model
        ref: "User",
        required: true, // User is required
    },
    createdAt: {
        type: Date,
        default: Date.now, // Set the default creation date
    },
});

// Create the Task model from the schema
const Task = mongoose.model("Task", taskSchema);

export default Task; // Export the Task model
