const express = require('express');
const todosRoutes = new express.Router();
const { addTodo, getTodos, updateTodo } = require('../controllers/todos.controller');

// get
todosRoutes.route('/todos/').get(async (req, res) => {
  await getTodos(req, res);
});

// add todos
todosRoutes.route('/todos/').post(async (req, res) => {
  await addTodo(req, res);
});

// update todo with todo_id
todosRoutes.route('/todos/:id').put(async (req, res) => {
  await updateTodo(req, res);
});

module.exports = todosRoutes;
