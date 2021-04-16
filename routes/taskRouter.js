const express = require('express');
const { createTask, getAllTasks, updateTask, deleteTask } = require('../controllers/taskController')

const router = express.Router();

//rotas para listar as tarefas e criar
router.route('/').get(getAllTasks).post(createTask);
//rotas para atualizar e remover as tarefas
router.route('/:id/userId/:userId').patch(updateTask).delete(deleteTask)


module.exports = router;