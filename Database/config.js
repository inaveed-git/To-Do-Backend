import mongoose from "mongoose";




// Function to connect to the MongoDB database

const connectDB = async () => {
    mongoose.connect(process.env.MONGODB_URL);

};

connectDB().then(() => {
    console.log("Database connected successfully"); // Log success message
}).catch(() => {
    console.log("Some error occur in database connection")
})


export default connectDB; // Export the connectDB function



