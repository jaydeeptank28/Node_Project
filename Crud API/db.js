const mongoose = require('mongoose');


//Define the MongoDB connection URL
const mongoURL = 'mongodb://localhost:27017/hotels'


//setUp mongodb connection
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


//get default connection
//Mongoose maintains a default connection object representing the mongoDB connection
const db = mongoose.connection;


//define event listener for database connection 
db.on('connected', () => {
    console.log('connected to MongoDB server');
})
db.on('error', (err) => {
    console.log('MongoDB server error:', err);
})
db.on('disconnected', () => {
    console.log('MongoDB server disconnected');
})

//export the database connection 
module.exports = db;
