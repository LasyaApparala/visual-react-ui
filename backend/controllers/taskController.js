const Task = require('../models/Task');

// Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Add new task
exports.addTask = async (req, res) => {  // Make sure this exists
  try {
    const { title, description } = req.body;

    const newTask = new Task({
      title,
      description,
      user: req.user.id,
    });

    const task = await newTask.save();
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update task
exports.updateTask = async (req, res) => {
  // ... implementation
};

// Delete task
exports.deleteTask = async (req, res) => {
  // ... implementation
};