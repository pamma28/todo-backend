const express = require('express');
const bodyParser = require('body-parser');
const Env = require('./helpers/environment');
const todosRoute = require('./routes/todo.routes');
const app = express();
const port = process.env.PORT || Env.get('APP_PORT');

app.use(bodyParser.json());
app.get('/', (req, res) =>
  res.send('Todos Backend Server, access swagger for more detail.')
);
app.use(todosRoute);

app.listen(port, () =>
  console.log(`app listening at http://localhost:${port}`)
);
