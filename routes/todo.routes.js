const express = require('express');
const todosRoutes = new express.Router();
const {
  addTodo,
  getTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} = require('../controllers/todos.controller');

// get one todo
todosRoutes.route('/todos/:id').get(async (req, res) => {
  await getTodo(req, res);
});

// get all todos
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

// delete todo with todo_id
todosRoutes.route('/todos/:id').delete(async (req, res) => {
  await deleteTodo(req, res);
});

module.exports = todosRoutes;
