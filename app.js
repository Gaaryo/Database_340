// App.js

/*
    SETUP
*/

var express = require("express"); // We are using the express library for the web server
var app = express(); // We need to instantiate an express object to interact with the server in our code

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

PORT = 9131; // Set a port number at the top so it's easy to change in the future
var db = require("./database/db-connector");

const { engine } = require("express-handlebars");
var exphbs = require("express-handlebars");
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
/*
    ROUTES
*/

// app.js

app.get("/", function (req, res) {
  res.render("index"); // an object where 'data' is equal to the 'rows' we
});

app.get("/tournamentsEdit", function (req, res) {
  res.render("tournamentsEdit");
});

app.get("/playersEdit", function (req, res) {
  let query1 = "SELECT * FROM Players;"; // Define our query

  db.pool.query(query1, function (error, rows, fields) { // Execute the query
    res.render("playersEdit", { data: rows }); // Render the index.hbs file, and also send the renderer
  });
});

app.get("/coachesEdit", function (req, res) {
  let query1 = "SELECT * FROM Coaches;"; // Define our query

  db.pool.query(query1, function (error, rows, fields) { // Execute the query
    res.render("coachesEdit", { data: rows }); // Render the index.hbs file, and also send the renderer
  });
});

app.get("/matchesEdit", function (req, res) {
  let query1 = "SELECT * FROM Matches;"; // Define our query

  //db.pool.query(query1, function(error, rows, fields){    // Execute the query
  //    res.render('matchesEdit', {data: rows});

  //})

  let query2 = "SELECT * FROM Players;";
  // Run the 1st query
  db.pool.query(query1, function (error, rows, fields) {
    // Save the matches
    let matches = rows;

    // Run the second query
    db.pool.query(query2, (error, rows, fields) => {
      // Save the players
      let players = rows;

      // Construct an object for reference in the table
      // Array.map is awesome for doing something with each
      // element of an array.
      let playermap = {};
      players.map((player) => {
        let id = parseInt(player.player_id, 10);

        playermap[id] = player["first_name"] + " " + player["last_name"];
      });

      // Overwrite the homeworld ID with the name of the planet in the people object
      matches = matches.map((match) => {
        return Object.assign(match, { player1: playermap[match.player1] });
      });

      matches = matches.map((match) => {
        return Object.assign(match, { player2: playermap[match.player2] });
      });

      matches = matches.map((match) => {
        return Object.assign(match, { winner: playermap[match.winner] });
      });

      return res.render("matchesEdit", { data: matches, players: players });
    });
  });
});

app.get("/sponsorsEdit", function (req, res) {
  res.render("sponsorsEdit");
});

app.get("/offeringsEdit", function (req, res) {
  let query1 = "SELECT * FROM Offerings;"; // Define our query

  db.pool.query(query1, function (error, rows, fields) { // Execute the query
    res.render("offeringsEdit", { data: rows });
  });
});

//View pages

app.get("/tournamentsView", function (req, res) {
  res.render("tournamentsView");
});

app.get("/playersView", function (req, res) {
  res.render("playersView");
});

app.get("/coachesView", function (req, res) {
  let query1 = "SELECT * FROM Coaches;"; // Define our query

  db.pool.query(query1, function (error, rows, fields) { // Execute the query
    res.render("coachesView", { data: rows }); // Render the index.hbs file, and also send the renderer
  });
});

app.get("/matchesView", function (req, res) {
  let query1 = "SELECT * FROM Matches;"; // Define our query

  let query2 = "SELECT * FROM Players;";
  // Run the 1st query
  db.pool.query(query1, function (error, rows, fields) {
    // Save the matches
    let matches = rows;

    // Run the second query
    db.pool.query(query2, (error, rows, fields) => {
      // Save the players
      let players = rows;

      // Construct an object for reference in the table
      // Array.map is awesome for doing something with each
      // element of an array.
      let playermap = {};
      players.map((player) => {
        let id = parseInt(player.player_id, 10);

        playermap[id] = player["first_name"] + " " + player["last_name"];
      });

      // Overwrite the homeworld ID with the name of the planet in the people object
      matches = matches.map((match) => {
        return Object.assign(match, { player1: playermap[match.player1] });
      });

      matches = matches.map((match) => {
        return Object.assign(match, { player2: playermap[match.player2] });
      });

      matches = matches.map((match) => {
        return Object.assign(match, { winner: playermap[match.winner] });
      });

      return res.render("matchesView", { data: matches, players: players });
    });
  });
});

app.get("/sponsorsView", function (req, res) {
  res.render("sponsorsView");
});

app.get("/offeringsView", function (req, res) {
  res.render("offeringsView");
});

//Test file

app.get("/test", function (req, res) {
  let query1 = "SELECT * FROM Coaches;"; // Define our query

  db.pool.query(query1, function (error, rows, fields) { // Execute the query
    //console.log(rows)
    res.render("coaches", { data: rows }); // Render the index.hbs file, and also send the renderer
  }); // an object where 'data' is equal to the 'rows' we
});

app.delete("/delete-coach-ajax/", function (req, res, next) {
  let data = req.body;
  let personID = parseInt(data.id);
  let deleteBsg_Coaches = `DELETE FROM Coaches WHERE coach_id = ?`;

  db.pool.query(deleteBsg_Coaches, [personID], function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.sendStatus(204);
    }
  });
});

app.delete("/delete-player-ajax/", function (req, res, next) {
  let data = req.body;
  let playerID = parseInt(data.id);
  let delete_Players = `DELETE FROM Players WHERE player_id = ?`;

  db.pool.query(delete_Players, [playerID], function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.sendStatus(204);
    }
  });
});

app.delete("/delete-offering-ajax/", function (req, res, next) {
  let data = req.body;
  let offeringID = parseInt(data.id);
  let deleteBsg_Offerings = `DELETE FROM Offerings WHERE offering_id = ?`;

  db.pool.query(
    deleteBsg_Offerings,
    [offeringID],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
        res.sendStatus(400);
      } else {
        res.sendStatus(204);
      }
    },
  );
});

app.delete("/delete-match-ajax/", function (req, res, next) {
  let data = req.body;
  let matchID = parseInt(data.id);
  let deleteBsg_Matches = `DELETE FROM Matches WHERE match_id = ?`;

  db.pool.query(deleteBsg_Matches, [matchID], function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.sendStatus(204);
    }
  });
});

app.post("/add-coach-form", function (req, res) {
  // Capture the incoming data and parse it back to a JS object
  let data = req.body;

  // Create the query and run it on the database
  query1 = `INSERT INTO Coaches (first_name, last_name) VALUES ('${
    data["input-first_name"]
  }', '${data["input-last_name"]}')`;
  db.pool.query(query1, function (error, rows, fields) {
    // Check to see if there was an error
    if (error) {
      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error);
      res.sendStatus(400);
    } // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
    // presents it on the screen
    else {
      res.redirect("/coachesEdit");
    }
  });
});

app.post("/add-player-form", function (req, res) {
  // Capture the incoming data and parse it back to a JS object
  let data = req.body;
  console.log(data);

  phone_num = data["input-phone_num"];
  if ((phone_num == undefined) || (phone_num === "")) {
    phone_num = "NULL";
  }

  coach_fname = data.coach_first_name;
  if ((coach_fname == undefined) || (coach_fname === "")) {
    coach_fname = "NULL";
  }

  coach_lname = data.coach_last_name;
  if ((coach_lname == undefined) || (coach_lname === "")) {
    coach_lname = "NULL";
  }

  // Create the query and run it on the database
  query1 =
    `INSERT INTO Players (first_name, last_name, nation, phone_num, coach_id) VALUES ('${
      data["input-first_name"]
    }', '${data["input-last_name"]}', '${
      data["input-nation"]
    }', '${phone_num}', (SELECT coach_id FROM Coaches WHERE Coaches.first_name = '${coach_fname}' AND  Coaches.last_name = '${coach_lname}'));`;
  db.pool.query(query1, function (error, rows, fields) {
    // Check to see if there was an error
    if (error) {
      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error);
      res.sendStatus(400);
    } // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
    // presents it on the screen
    else {
      res.redirect("/playersEdit");
    }
  });
});

app.post("/add-offering-form", function (req, res) {
  // Capture the incoming data and parse it back to a JS object
  let data = req.body;
  console.log(data);

  // Create the query and run it on the database
  query1 = `INSERT INTO Offerings (stuff) VALUES ('${data["input-stuff"]}');`;
  db.pool.query(query1, function (error, rows, fields) {
    console.log(error);
    // Check to see if there was an error
    if (error) {
      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error);
      res.sendStatus(400);
    } // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
    // presents it on the screen
    else {
      res.redirect("/offeringsEdit");
    }
  });
});

app.post("/edit-offering-form", function (req, res) {
  // Capture the incoming data and parse it back to a JS object
  let data = req.body;
  console.log(data);

  // Create the query and run it on the database
  query1 = `UPDATE Offerings SET stuff = '${
    data["edit-stuff"]
  }' WHERE offering_id = '${data["edit-id"]}';`;
  db.pool.query(query1, function (error, rows, fields) {
    console.log(error);
    // Check to see if there was an error
    if (error) {
      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error);
      res.sendStatus(400);
    } // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
    // presents it on the screen
    else {
      res.redirect("/offeringsEdit");
    }
  });
});

app.post("/add-match-form", function (req, res) {
  // Capture the incoming data and parse it back to a JS object
  let data = req.body;

  query1 =
    `INSERT INTO Matches (date, player1, player2, winner, score, year) VALUES ('${
      data["input-date"]
    }', ${data["input-player1"]}, ${data["input-player2"]}, ${
      data["input-winner"]
    }, '${data["input-score"]}', '${data["input-year"]}' )`;
  db.pool.query(query1, function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.redirect("/matchesEdit");
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
