// deno-lint-ignore-file no-var
// App.js

/*
    SETUP
*/
var db = require("./database/db-connector.js");
var express = require("express"); // We are using the express library for the web server
var app = express(); // We need to instantiate an express object to interact with the server in our code
PORT = 50105; // Set a port number at the top so it's easy to change in the future

/*
    ROUTES
*/
app.get("/", function (req, res) {
  // Define our queries
  query1 = "DROP TABLE IF EXISTS Tournaments;";
  query2 =
    "CREATE TABLE Tournaments (year YEAR NOT NULL UNIQUE, venue varchar(255) NOT NULL, sponsor_id int(11), PRIMARY KEY (year), FOREIGN KEY (sponsor_id) REFERENCES Sponsors(sponsor_id))";
  query3 =
    "INSERT INTO Tournaments (year, venue, sponsor_id VALUES (2018, 'New York Tennis Garden', 1), (2019, 'California City Park', 2),";
  query4 = "SELECT * FROM Tournaments;";

  // Execute every query in an asynchronous manner, we want each query to finish before the next one starts

  // DROP TABLE...
  db.pool.query(query1, function (err, results, fields) {
    // CREATE TABLE...
    db.pool.query(query2, function (err, results, fields) {
      // INSERT INTO...
      db.pool.query(query3, function (err, results, fields) {
        // SELECT *...
        db.pool.query(query4, function (err, results, fields) {
          // Send the results to the browser
          res.send(JSON.stringify(results));
        });
      });
    });
  });
});

/*
    LISTENER
*/
app.listen(PORT, function () { // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
  console.log(
    "Express started on http://localhost:" + PORT +
      "; press Ctrl-C to terminate.",
  );
});
