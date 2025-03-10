import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;

        await mongoose.connect(uri   ||'mongodb+srv://umar:umar@cluster0.hlv1d.mongodb.net/yourDatabase?retryWrites=true&w=majority')
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.error("Database connection failed", error);
        process.exit(1);
    }
};

export default connectDB;
