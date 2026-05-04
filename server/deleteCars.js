import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Since Car model might not be easily importable if it uses export default or module structure,
// we'll just connect and use mongoose.connection.db.collection('cars').deleteMany({})
const deleteCars = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
        
        const result = await mongoose.connection.db.collection('cars').deleteMany({});
        console.log(`Successfully deleted ${result.deletedCount} cars from the database.`);
        
        process.exit(0);
    } catch (error) {
        console.error('Error deleting cars:', error);
        process.exit(1);
    }
};

deleteCars();
