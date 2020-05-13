const express = require('express');
const Env = require('./helpers/environment');
const app = express();
const port = process.env.PORT || Env.get('APP_PORT');

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () =>
  console.log(`app listening at http://localhost:${port}`)
);
