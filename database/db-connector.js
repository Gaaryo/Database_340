// deno-lint-ignore-file no-var
// ./database/db-connector.js

// Get an instance of mysql we can use in the app
var mysql = require("mysql");

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
  connectionLimit: 10,
  host: "classmysql.engr.oregonstate.edu",
  user: "cs340_gantz",
  password: "7767",
  database: "cs340_gantz",
});

// Export it for use in our applicaiton
module.exports.pool = pool;
