require('dotenv').config();
/**
 * How to use?
 * const Env = require("./environment");
 * const keyStr = Env.get('APP_NAME')
 * const keyInt = Env.getInt('APP_NAME')
 * const keyBoolean = Env.getBoolean('APP_NAME')
 */

module.exports.get = (key) => {
  return process.env[key];
};
