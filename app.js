// App.js

/*
    SETUP
*/

const express = require("express"); // We are using the express library for the web server
const app = express(); // We need to instantiate an express object to interact with the server in our code

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

PORT = 9131; // Set a port number at the top so it's easy to change in the future
const db = require("./database/db-connector");

const { engine } = require("express-handlebars");
const _exphbs = require("express-handlebars");
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
/*
    ROUTES
*/

// app.js

app.get("/", function (_req, res) {
  res.render("index"); // an object where 'data' is equal to the 'rows' we
});

app.get("/tournamentsEdit", function (_req, res) {
  const query = "\
    SELECT * FROM Tournaments\
    LEFT JOIN Sponsors ON Sponsors.sponsor_id = Tournaments.sponsor_id;";

  db.pool.query(query, function (_error, rows, _fields) {
    console.log(rows);
    res.render("tournamentsEdit", { data: rows });
  });
});

app.get("/playersEdit", function (_req, res) {
  //query1 = "SELECT * FROM Players LEFT JOIN Coaches ON Coaches.coach_id = Players.coach_id;";
  query1 = "SELECT *,\
           Players.first_name AS player_first_name,\
           Players.last_name AS player_last_name,\
           Coaches.first_name AS coach_first_name,\
           Coaches.last_name AS coach_last_name\
           FROM Players LEFT JOIN Coaches ON Coaches.coach_id = Players.coach_id;";

  db.pool.query(query1, function (_error, rows, _fields) { // Execute the query
    res.render("playersEdit", { data: rows }); // Render the index.hbs file, and also send the renderer
  });
});

app.get("/coachesEdit", function (_req, res) {
  const query1 = "SELECT * FROM Coaches;"; // Define our query

  db.pool.query(query1, function (_error, rows, _fields) { // Execute the query
    res.render("coachesEdit", { data: rows }); // Render the index.hbs file, and also send the renderer
  });
});

app.get("/matchesEdit", function (_req, res) {
  const query1 =
    "Select match_id, DATE_FORMAT(date, '%Y %m %d') as date, player1, player2, winner, score, year FROM Matches;"; // Define our query

  //db.pool.query(query1, function(error, rows, fields){    // Execute the query
  //    res.render('matchesEdit', {data: rows});

  //})

  const query2 = "SELECT * FROM Players;";
  // Run the 1st query
  db.pool.query(query1, function (_error, rows, _fields) {
    // Save the matches
    let matches = rows;
    // Run the second query
    db.pool.query(query2, (_error, rows, _fields) => {
      // Save the players
      const players = rows;
      // Construct an object for reference in the table
      // Array.map is awesome for doing something with each
      // element of an array.
      const playermap = {};
      players.map((player) => {
        const id = parseInt(player.player_id, 10);

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

app.get("/sponsorsEdit", function (_req, res) {
  res.render("sponsorsEdit");
});

app.get("/offeringsEdit", function (_req, res) {
  const query1 = "SELECT * FROM Offerings;"; // Define our query

  db.pool.query(query1, function (_error, rows, _fields) { // Execute the query
    res.render("offeringsEdit", { data: rows });
  });
});

//View pages

app.get("/tournamentsView", function (_req, res) {
  const query = "\
    SELECT * FROM Tournaments\
    LEFT JOIN Sponsors ON Sponsors.sponsor_id = Tournaments.sponsor_id;";

  db.pool.query(query, function (_error, rows, _fields) {
    console.log(rows);
    res.render("tournamentsView", { data: rows });
  });
});

app.get("/playersView", function (_req, res) {
  const query = "SELECT *,\
           Players.first_name AS player_first_name,\
           Players.last_name AS player_last_name,\
           Coaches.first_name AS coach_first_name,\
           Coaches.last_name AS coach_last_name\
           FROM Players LEFT JOIN Coaches ON Coaches.coach_id = Players.coach_id;";

  db.pool.query(query, function (_error, rows, _fields) {
    res.render("playersView", { data: rows });
  });
});

app.get("/coachesView", function (_req, res) {
  const query1 = "SELECT * FROM Coaches;"; // Define our query

  db.pool.query(query1, function (_error, rows, _fields) { // Execute the query
    res.render("coachesView", { data: rows }); // Render the index.hbs file, and also send the renderer
  });
});

app.get("/matchesView", function (_req, res) {
  const query1 = "SELECT * FROM Matches;"; // Define our query

  const query2 = "SELECT * FROM Players;";
  // Run the 1st query
  db.pool.query(query1, function (_error, rows, _fields) {
    // Save the matches
    let matches = rows;

    // Run the second query
    db.pool.query(query2, (_error, rows, _fields) => {
      // Save the players
      const players = rows;

      // Construct an object for reference in the table
      // Array.map is awesome for doing something with each
      // element of an array.
      const playermap = {};
      players.map((player) => {
        const id = parseInt(player.player_id, 10);

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

app.get("/sponsorsView", function (_req, res) {
  const query = "SELECT * FROM Sponsors\
    LEFT JOIN Offerings\
    ON Sponsors.offering_id = Offerings.offering_id;"; // Define our query

  db.pool.query(query, function (_error, rows, _fields) { // Execute the query
    //console.log(rows)
    res.render("sponsorsView", { data: rows }); // Render the index.hbs file, and also send the renderer
  }); // an object where 'data' is equal to the 'rows' we
});

app.get("/offeringsView", function (_req, res) {
  const query = "SELECT * FROM Offerings;"; // Define our query

  db.pool.query(query, function (_error, rows, _fields) { // Execute the query
    //console.log(rows)
    res.render("offeringsView", { data: rows }); // Render the index.hbs file, and also send the renderer
  }); // an object where 'data' is equal to the 'rows' we
});

//Test file

app.get("/test", function (_req, res) {
  const query1 = "SELECT * FROM Coaches;"; // Define our query

  db.pool.query(query1, function (_error, rows, _fields) { // Execute the query
    //console.log(rows)
    res.render("coaches", { data: rows }); // Render the index.hbs file, and also send the renderer
  }); // an object where 'data' is equal to the 'rows' we
});

app.delete("/delete-coach-ajax/", function (req, res, _next) {
  const data = req.body;
  const personID = parseInt(data.id);
  const deleteBsg_Coaches = `DELETE FROM Coaches WHERE coach_id = ?`;

  db.pool.query(
    deleteBsg_Coaches,
    [personID],
    function (error, _rows, _fields) {
      if (error) {
        //console.log(error);
        res.sendStatus(400);
      } else {
        res.sendStatus(204);
      }
    },
  );
});

app.delete("/delete-player-ajax/", function (req, res, _next) {
  const data = req.body;
  const playerID = parseInt(data.id);
  const delete_Players = `DELETE FROM Players WHERE player_id = ?`;

  db.pool.query(delete_Players, [playerID], function (error, _rows, _fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.sendStatus(204);
    }
  });
});

app.delete("/delete-offering-ajax/", function (req, res, _next) {
  const data = req.body;
  const offeringID = parseInt(data.id);
  const deleteBsg_Offerings = `DELETE FROM Offerings WHERE offering_id = ?`;

  db.pool.query(
    deleteBsg_Offerings,
    [offeringID],
    function (error, _rows, _fields) {
      if (error) {
        console.log(error);
        res.sendStatus(400);
      } else {
        res.sendStatus(204);
      }
    },
  );
});

app.delete("/delete-tournament-ajax/", function (req, res, _next) {
  const data = req.body;
  const tournamentID = parseInt(data.year);
  const deleteBsg_Tournaments = `DELETE FROM Tournaments WHERE year = ?`;

  db.pool.query(
    deleteBsg_Tournaments,
    [tournamentID],
    function (error, _rows, _fields) {
      if (error) {
        console.log(error);
        res.sendStatus(400);
      } else {
        res.sendStatus(204);
      }
    },
  );
});

app.delete("/delete-match-ajax/", function (req, res, _next) {
  const data = req.body;
  const matchID = parseInt(data.id);
  const deleteBsg_Matches = `DELETE FROM Matches WHERE match_id = ?`;

  db.pool.query(deleteBsg_Matches, [matchID], function (error, _rows, _fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.sendStatus(204);
    }
  });
});

//post coach
app.post("/add-coach-form", function (req, res) {
  // Capture the incoming data and parse it back to a JS object
  const data = req.body;

  // Create the query and run it on the database
  query1 = `INSERT INTO Coaches (first_name, last_name) VALUES (?, ?)`;

  db.pool.query(
    query1,
    [data["input-first_name"], data["input-last_name"]],
    function (error, _rows, _fields) {
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
    },
  );
});

//coach

app.post("/add-player-form", function (req, res) {
  // Capture the incoming data and parse it back to a JS object
  const data = req.body;
  //console.log(data);

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
  db.pool.query(query1, function (error, _rows, _fields) {
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
  const data = req.body;
  //console.log(data);

  // Create the query and run it on the database
  query1 = `INSERT INTO Offerings (stuff) VALUES ('${data["input-stuff"]}');`;
  db.pool.query(query1, function (error, _rows, _fields) {
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
  const data = req.body;
  //console.log(data);

  // Create the query and run it on the database
  query1 = `UPDATE Offerings SET stuff = '${
    data["edit-stuff"]
  }' WHERE offering_id = '${data["edit-id"]}';`;
  db.pool.query(query1, function (error, _rows, _fields) {
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

app.post("/add-tournament-form", function (req, res) {
  // Capture the incoming data and parse it back to a JS object
  const data = req.body;
  //console.log(data);

  // Create the query and run it on the database
  const query = `INSERT INTO Tournaments (year, venue, sponsor_id)\
    VALUES ('${data["input-year"]}', '${data["input-venue"]}',\
    (SELECT Sponsors.sponsor_id FROM Sponsors\
    WHERE Sponsors.sponsor_name = '${data["input-sponsor-name"]}'));`;

  db.pool.query(query, function (error, _rows, _fields) {
    console.log(error);
    // Check to see if there was an error
    if (error) {
      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error);
      res.sendStatus(400);
    } // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
    // presents it on the screen
    else {
      res.redirect("/tournamentsEdit");
    }
  });
});

app.post("/edit-tournament-form", function (req, res) {
  // Capture the incoming data and parse it back to a JS object
  const data = req.body;
  console.log(data);

  let sponsor_name = `'${data["edit-sponsor-name"]}'`;
  if (sponsor_name === "''") {
      sponsor_name = "NULL";
  }

  let venue = `'${data["edit-venue"]}'`;
  if (venue === "''") {
      venue = "NULL";
  }

  // Create the query and run it on the database
  const query = `UPDATE Tournaments SET\
  venue = CASE WHEN ${venue}\
    IS NOT NULL THEN ${venue}\
    ELSE venue END,\
  sponsor_id = CASE WHEN ${sponsor_name}\
    IS NOT NULL THEN\
      (SELECT Sponsors.sponsor_id FROM Sponsors\
      WHERE Sponsors.sponsor_name = ${sponsor_name} LIMIT 1)\
    ELSE sponsor_id END\
  WHERE year = '${data["edit-year"]}';`;
  db.pool.query(query, function (error, _rows, _fields) {
    console.log(error);
    // Check to see if there was an error
    if (error) {
      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error);
      res.sendStatus(400);
    } // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
    // presents it on the screen
    else {
      res.redirect("/tournamentsEdit");
    }
  });
});

app.post("/add-match-form", function (req, res) {
  // Capture the incoming data and parse it back to a JS object
  const data = req.body;
  //console.log(data);
  if (data["input-winner"] == "1") {
    winner = data["input-player1"];
  } else {
    winner = data["input-player2"];
  }

  query1 = `INSERT INTO Matches (date, player1, player2, winner, score, year) 
    VALUES (?, ?, ?, ?, ?, ? )`;

  //VALUES ('${  data["input-date"], ${data["input-player1"]}, ${data["input-player2"]}, ${winner}, '${data["input-score"]}', '${data["input-year"]}' )`;

  query2 = db.pool.query(query1, [
    data["input-date"],
    data["input-player1"],
    data["input-player2"],
    winner,
    data["input-score"],
    data["input-year"],
  ], function (error, _rows, _fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.redirect("/matchesEdit");
    }
  });
});

//--------------------------- UPDATE PUT --------------------------
app.put("/put-coach-ajax", function (req, res, _next) {
  const data = req.body;
  //console.log(data);

  const firstName = data.first_name;
  const lastName = data.last_name;
  const coach_id = parseInt(data.coach_id);

  queryUpdateFirstLastName =
    `UPDATE Coaches SET first_name = ?, last_name = ? WHERE Coaches.coach_id = ?`;

  //selectWorld = `SELECT * FROM bsg_planets WHERE id = ?`

  // Run the 1st query
  db.pool.query(
    queryUpdateFirstLastName,
    [firstName, lastName, coach_id],
    function (error, _rows, _fields) {
      if (error) {
        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
        console.log(error);
        res.sendStatus(400);
      } // If there was no error, we run our second query and return that data so we can use it to update the people's
      // table on the front-end
      else {
        const data = {
          first_name: firstName,
          last_name: lastName,
        };
        res.send(JSON.stringify(data));
      }
    },
  );
});

app.put("/put-match-ajax", function (req, res, _next) {
  const data = req.body;
  console.log("Hello");
  console.log(data);

  const score = data.score;
  const match_id = parseInt(data.match_id);

  queryUpdateScore = `UPDATE Matches SET score = ? WHERE Matches.match_id = ?`;

  //selectWorld = `SELECT * FROM bsg_planets WHERE id = ?`

  // Run the 1st query
  db.pool.query(
    queryUpdateScore,
    [score, match_id],
    function (error, _rows, _fields) {
      if (error) {
        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
        console.log(error);
        res.sendStatus(400);
      } // If there was no error, we run our second query and return that data so we can use it to update the people's
      // table on the front-end
      else {
        const data = {
          score: score,
        };
        res.send(JSON.stringify(data));
      }
    },
  );
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
