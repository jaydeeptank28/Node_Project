const mongoose = require('mongoose');
require('dotenv').config();

// Set up MongoDB connection without deprecated options
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log(`connected to MongoDB server ${mongoose.connection.host}`);
    })
    .catch((err) => {
        console.log('MongoDB server error:', err);
    });

// Get default connection
const db = mongoose.connection;

// Define event listeners for database connection
db.on('disconnected', () => {
    console.log('MongoDB server disconnected');
});

// Export the database connection
module.exports = db;
