// configuration for db and specifying it
require('dotenv').config();
const knex = require('knex');
const config = require('../knexfile.js');

const dbEnv = process.env.DB_ENV || 'development';
// console.log('db_env environment variable: ', process.env.DB_ENV)
// console.log('dbEnv: ', dbEnv)
const configObj = config[dbEnv]

// module.exports = knex(config[dbEnv]);

module.exports = knex(configObj);
