// App.js

// deno-lint-ignore-file no-var

/*
    SETUP
*/
var db = require("./database/db-connector.js");
var express = require("express"); // We are using the express library for the web server
var app = express(); // We need to instantiate an express object to interact with the server in our code
PORT = 50105; // Set a port number at the top so it's easy to change in the future
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

/*
    LISTENER
*/
app.listen(PORT, function () { // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
  console.log(
    "Express started on http://localhost:" + PORT +
      "; press Ctrl-C to terminate.",
  );
});
