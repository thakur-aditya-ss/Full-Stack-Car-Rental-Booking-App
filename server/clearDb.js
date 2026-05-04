import mongoose from "mongoose";
import connectDB from "./configs/db.js";
import User from "./models/User.js";
import Car from "./models/Car.js";
import Booking from "./models/Booking.js";
import dotenv from "dotenv";

dotenv.config();

const clearDatabase = async () => {
    try {
        await connectDB();
        
        console.log("Starting database cleanup...");
        
        // Deleting in order of dependencies
        const bookingResult = await Booking.deleteMany({});
        console.log(`Deleted ${bookingResult.deletedCount} bookings.`);
        
        const carResult = await Car.deleteMany({});
        console.log(`Deleted ${carResult.deletedCount} cars.`);
        
        const userResult = await User.deleteMany({});
        console.log(`Deleted ${userResult.deletedCount} users/admins.`);
        
        console.log("------------------------------------");
        console.log("Database cleared successfully!");
        console.log("You can now start fresh with new registrations.");
        console.log("------------------------------------");
        
        process.exit(0);
    } catch (error) {
        console.error("Critical Error clearing database:", error.message);
        process.exit(1);
    }
};

clearDatabase();
