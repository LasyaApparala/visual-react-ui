const express = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/auth');
const router = express.Router();

// Create new task
router.post('/', auth, async (req, res) => {
  try {
    console.log('User object:', req.user); // Debugging
    console.log('User ID:', req.user._id); // Use _id instead of userId
    
    const { title, description } = req.body;

    // Validate input
    if (!title || typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({ 
        success: false,
        message: 'Valid task title is required' 
      });
    }

    // Create task - use req.user._id instead of req.user.userId
    const task = new Task({
      title: title.trim(),
      description: description?.trim() || '',
      status: 'pending',
      user: req.user._id // Fixed: use _id instead of userId
    });

    // Save to database
    const savedTask = await task.save();
    
    // Format response
    const response = {
      success: true,
      task: {
        _id: savedTask._id,
        title: savedTask.title,
        description: savedTask.description,
        status: savedTask.status,
        createdAt: savedTask.createdAt,
        updatedAt: savedTask.updatedAt
      }
    };

    res.status(201).json(response);

  } catch (error) {
    console.error('Task creation error:', error);
    
    // Handle different error types
    let status = 500;
    let message = 'Failed to create task';

    if (error.name === 'ValidationError') {
      status = 400;
      message = Object.values(error.errors).map(val => val.message).join(', ');
    }

    res.status(status).json({ 
      success: false,
      message 
    });
  }
});

// Get all tasks for the authenticated user
router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id })
      .sort({ createdAt: -1 });
    
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Failed to fetch tasks' });
  }
});

// Get task stats
router.get('/stats', auth, async (req, res) => {
  try {
    const total = await Task.countDocuments({ user: req.user._id });
    const completed = await Task.countDocuments({ user: req.user._id, status: 'completed' });
    const pending = await Task.countDocuments({ user: req.user._id, status: 'pending' });

    res.json({
      total,
      completed,
      pending
    });
  } catch (error) {
    console.error('Error fetching task stats:', error);
    res.status(500).json({ message: 'Failed to fetch task stats' });
  }
});

// Update task status
router.patch('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['pending', 'completed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { status },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    console.error('Error updating task status:', error);
    res.status(500).json({ message: 'Failed to update task status' });
  }
});

// Delete task
router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Failed to delete task' });
  }
});

module.exports = router;