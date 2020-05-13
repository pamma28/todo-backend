const express = require('express');
const todosRoutes = new express.Router();
const { addTodo, getTodos } = require('../controllers/todos.controller');

// get todos
todosRoutes.route('/todos').get(async (req, res) => {
  await getTodos(req, res);
});
// add todos
todosRoutes.route('/todos').post(async (req, res) => {
  await addTodo(req, res);
});

module.exports = todosRoutes;
