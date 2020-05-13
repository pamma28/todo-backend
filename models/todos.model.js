const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Todos = new Schema({
  description: { type: String, required: true },
  deadline: { type: Date, required: true },
  done: { type: Boolean, required: false },
});

module.exports = mongoose.model('Todo', Todos);
