const mongoose = require('mongoose');

// const dbURL = ''; 

const connectDB = async () => {
    try {
        await mongoose.connect(dbURL); // Removed deprecated options
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

// Optional: Add connection events 
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to DB');
});

mongoose.connection.on('error', (err) => {
    console.error(`Mongoose connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

module.exports = connectDB;
