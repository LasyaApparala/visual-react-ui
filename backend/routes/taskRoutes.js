const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');

// Make sure these match the exported controller methods exactly
router.get('/', auth, taskController.getTasks);
router.post('/', auth, taskController.addTask);  // This was causing the error
router.put('/:id', auth, taskController.updateTask);
router.delete('/:id', auth, taskController.deleteTask);

module.exports = router;