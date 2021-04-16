const express = require('express');
const { createTask, getAllTasks, updateTask, deleteTask } = require('../controllers/taskController')

const router = express.Router();

router.route('/').get(getAllTasks).post(createTask);
//router.route('/:id').patch(updateTask).delete(deleteTask);
router.route('/:id/userId/:userId').patch(updateTask).delete(deleteTask)


module.exports = router;