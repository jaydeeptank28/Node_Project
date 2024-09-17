const Task = require('../models/task');

// Get all tasks
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.render('index', { tasks: tasks });
    } catch (err) {
        res.status(500).send(err);
    }
};

// Add a new task
const addTask = async (req, res) => {
    const task = new Task({
        name: req.body.newtask
    });
    try {
        await task.save();
        res.redirect('/');
    } catch (err) {
        res.status(500).send(err);
    }
};

// Delete a task
const deleteTask = async (req, res) => {
    const taskId = req.body.taskToDelete;
    try {
        await Task.findByIdAndDelete(taskId);
        res.redirect('/');
    } catch (err) {
        res.status(500).send(err);
    }
};


module.exports = { getTasks, addTask, deleteTask }