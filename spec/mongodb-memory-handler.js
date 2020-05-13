const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongod = new MongoMemoryServer();

/**
 * Connect to the in-memory database.
 */
const connectDatabase = async () => {
  const uri = await mongod.getConnectionString();

  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  await mongoose.connect(uri, mongooseOpts);
};

/**
 * Drop database, close the connection and stop mongod.
 */
const closeDatabase = async () => {
  // await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};

/**
 * Insert data to specific db collection.
 */
const initCollectionDb = async (collectionName, data) => {
  const collection = mongoose.connection.collections[collectionName];

  if (collection) {
    return collection.insertMany(data);
  }
};

/**
 * Get data from specific db collection.
 */
const getCollectionDb = async (collectionName, filter) => {
  const collection = mongoose.connection.collections[collectionName];

  if (collection) {
    return collection.findOne(filter);
  }
};

/**
 * @param {*} collectionName = model name
 */
const getAllCollectionDb = async (collectionName) => {
  const modelName = mongoose.connection.collections[collectionName];
  const data = await new Promise((resolve) => {
    modelName.find({}, (err, cursor) => resolve(cursor.toArray()));
  });
  if (!data) return [];
  return data;
};

module.exports = {
  connectDatabase,
  closeDatabase,
  getCollectionDb,
  initCollectionDb,
  getAllCollectionDb,
};
