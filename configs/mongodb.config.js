const mongoose = require('mongoose');
const ENV = require('../helpers/environment');

mongoose
  .connect(
    ENV.get('DB_URI'),
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      retryWrites: false,
      useFindAndModify: false,
    },
    () => {
      console.log('Connected to DB');
    }
  )
  .catch((err) => {
    console.log(err);
    throw err;
  });
