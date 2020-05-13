require('../configs/mongodb.config');
const Todos = require('../models/todos.model');

/**
 * Get todo that match id
 * @param {id} _id
 */
const getTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todos.findById(id);
    res.status(200).send(todo);
  } catch (error) {
    res.send({ error: true, message: error.message });
  }
};

/**
 * Get all todo
 */
const getTodos = async (req, res) => {
  try {
    const todos = await Todos.find({});
    res.status(200).send(todos);
  } catch (error) {
    res.send({ error: true, message: error.message });
  }
};

/**
 * add Todo with body params
 * @param {object} body
 */
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

/**
 * update Todo that match id
 * @param {object} body
 * @param {id} _id
 */
const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const dataTodo = await Todos.findById(id);
    if (!dataTodo) {
      throw new Error('No todo selected to update');
    }
    Object.keys(req.body).forEach((key) => {
      dataTodo[key] = req.body[key];
    });
    await dataTodo.save();
    res.status(204).send();
  } catch (error) {
    res.send({ error: true, message: error.message });
  }
};

/**
 * delete Todo that match id
 * @param {id} _id
 */
const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const dataTodo = await Todos.findById(id);
    if (!dataTodo) {
      throw new Error('No todo selected to delete');
    }

    await Todos.findOneAndRemove({ _id: id });
    res.status(204).send();
  } catch (error) {
    res.send({ error: true, message: error.message });
  }
};

module.exports = { getTodo, getTodos, addTodo, updateTodo, deleteTodo };
