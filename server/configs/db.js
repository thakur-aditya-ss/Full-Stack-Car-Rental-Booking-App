import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        mongoose.connection.on('connected', ()=> console.log("Database Connected Successfully"));
        
        // Remove angle brackets if user accidentally left them in from Atlas placeholder
        const uri = process.env.MONGODB_URI.replace('<', '').replace('>', '');
        
        await mongoose.connect(`${uri}/car-rental`)
    } catch (error) {
        console.log("Database Connection Error:", error.message);
    }
}

export default connectDB;