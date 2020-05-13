const express = require('express');
const todosRoutes = new express.Router();

// get
todosRoutes.route('/todos').get(async (req, res) => {
  try {
    res.send([]);
  } catch (error) {
    res.send({ error: true, message: error.message });
  }
});

module.exports = todosRoutes;
