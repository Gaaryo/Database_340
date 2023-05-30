// App.js

// deno-lint-ignore-file no-var

/*
    SETUP
*/
var db = require("./database/db-connector.js");
var express = require("express"); // We are using the express library for the web server
var app = express(); // We need to instantiate an express object to interact with the server in our code
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
PORT = 50505; // Set a port number at the top so it's easy to change in the future
const { engine } = require("express-handlebars");
var exphbs = require("express-handlebars");
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");

/*
    ROUTES
*/
app.get("/", function (req, res) {
  let query1 = "SELECT * FROM Tournaments";
  db.pool.query(query1, function (error, rows, fields) {
    res.render("index", { data: rows });
  });
});

// app.js - ROUTES section

app.post("/add-tournament-ajax", function (req, res) {
  // Capture the incoming data and parse it back to a JS object
  let data = req.body;

  console.log(req.body);

  // Capture NULL values
  let point = parseInt(data.point);
  if (isNaN(point)) {
    point = "NULL";
  }

  let sponsor = parseInt(data.sponsor);
  if (isNaN(sponsor)) {
    sponsor = "NULL";
  }

  // Create the query and run it on the database
  query1 =
    `INSERT INTO Tournaments (year, tournament_point, venue, sponsor_id) VALUES ('${data.year}', '${point}', '${data.venue}', '${sponsor}')`;
  db.pool.query(query1, function (error, rows, fields) {
    // Check to see if there was an error
    if (error) {
      console.log(error);
      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      res.sendStatus(400);
    } else {
      // If there was no error, perform a SELECT * on Tournaments
      query2 = `SELECT * FROM Tournaments;`;
      db.pool.query(query2, function (error, rows, fields) {
        // If there was an error on the second query, send a 400
        if (error) {
          console.log(error);
          // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
          res.sendStatus(400);
        } // If all went well, send the results of the query back.
        else {
          res.send(rows);
        }
      });
    }
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
