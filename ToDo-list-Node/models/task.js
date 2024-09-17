const mongoose = require('mongoose');

// Define the task schema
const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

// Create and export the model
const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
