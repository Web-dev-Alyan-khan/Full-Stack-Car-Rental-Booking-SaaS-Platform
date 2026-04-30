import mongoose from "mongoose";
import dns from 'dns';

// Fixes potential DNS resolution issues for MongoDB Atlas
dns.setServers(['1.1.1.1', '8.8.8.8']);

const connectDB = async () => {
    try {
        // Adding connection listeners for better monitoring
        mongoose.connection.on('connected', () => {
            console.log("✅ Database Connected Successfully");
        });  

        mongoose.connection.on('error', (err) => {
            console.log(`❌ Mongoose Connection Error: ${err}`);
        });    
        await mongoose.connect(`${process.env.MONGODB_URI}/Car Rental Booking`);

    } catch (error) {
        console.error("❌ MongoDB Connection Failed:", error.message);
        process.exit(1); // Stop the server if the DB doesn't connect
    }
};

export default connectDB;