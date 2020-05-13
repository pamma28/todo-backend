require('../configs/mongodb.config');
const Todos = require('../models/todos.model');

/**
 * Get user that match criteria
 * @param {object} filter
 */
const getTodo = async (filter) => {
  return await Todos.find(filter);
};

const getTodos = async (req, res) => {
  try {
    const todos = await Todos.find({});
    res.status(200).send(todos);
  } catch (error) {
    res.send({ error: true, message: error.message });
  }
};

const addTodo = async (req, res) => {
  try {
    const { description, done, deadline } = req.body;
    const newTodo = new Todos({
      description,
      done,
      deadline,
    });
    await newTodo.save();
    res.status(204).send();
  } catch (error) {
    res.send({ error: true, message: error.message });
  }
};

module.exports = { getTodo, getTodos, addTodo };