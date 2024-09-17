const express = require('express');
const router = express.Router();
const  { getTasks, addTask, deleteTask } = require('../conntroller/taskControllers');

// Define routes
router.get('/', getTasks);
router.post('/addtask', addTask);
router.post('/deletetask', deleteTask);

module.exports = router;
