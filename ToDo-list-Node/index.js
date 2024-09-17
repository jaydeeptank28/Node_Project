const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/taskroutes');
const app = express();

// Connect to MongoDB Atlas
mongoose.connect('mongodb://localhost:27017/todo', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Set EJS as templating engine
app.set('view engine', 'ejs');

// Use routes
app.use('/', taskRoutes);

// Start server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
