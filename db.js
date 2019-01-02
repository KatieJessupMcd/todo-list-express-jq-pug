/** Database setup for lists. */

const { Client } = require('pg');
// const { DB_URI } = require('./config');

const client = new Client('postgres:///lists-test');

// const client = new Client({
//   connectionString: DB_URI
// });

client.connect();

module.exports = client;
