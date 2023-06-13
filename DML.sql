-- list tournaments
SELECT year, tournament_point, venue, sponsor_id FROM Tournaments ORDER BY YEAR;

-- list players
SELECT first_name, last_name, total_point, origin, phone_num, email, coach_id FROM Players ORDER BY first_name;

-- list coaches
SELECT coach_id, first_name, last_name FROM Coaches ORDER BY first_name;

-- list matches
SELECT date, duration, player1, player2, winner, score FROM Matches
    WHERE tournament_id = (SELECT tournament_id FROM Tournaments WHERE year = :yearInput);

-- list sponsors
SELECT sponsor_name, advertise_type, offering_id FROM Sponsors;

-- list offerings
SELECT stuff, offering_id FROM Offerings;


-- add tournament
INSERT INTO Tournaments (year, tournament_point, venue, sponsor_id) VALUES
(:yearInput, :pointsInput, :venueInput, :sponsorIdInput);

-- add player
INSERT INTO Players (first_name, last_name, total_point, origin, phone_num, email, coach_id) VALUES
(:fnameInput, :lnameInput, :totalPointInput, :originInput, :phoneNumInput, :emailInput, :coachIdInput);

-- add coach
INSERT INTO Coaches (first_name, last_name) VALUES
(:fnameInput, lnameInput);

-- add matches
INSERT INTO Matches (date, duration, player1, player2, winner, score) VALUES
(:dateInput, :durationInput, :player1Input, :player2Input, :winnerInput, :scoreInput);

-- add sponsors
INSERT INTO ??? VALUES Sponsors;

-- add offerings
INSERT INTO ??? VALUES Offerings;


-- update player coach id
UPDATE players set coach_id = :coachIdInput WHERE first_name = :fnameInput AND last_name = :lnameInput;

-- update player email
UPDATE players set email = :emailInput WHERE first_name = :fnameInput AND last_name = :lnameInput;

-- delete matches
DELETE FROM Coaches WHERE coach_id = ?;

-- delete player
DELETE FROM Players WHERE player_id = ?;

-- delete offerings
DELETE FROM Offerings WHERE offering_id = ?;

-- delete tournaments
DELETE FROM Tournaments WHERE year = ?;

-- delete sponsors
DELETE FROM Sponsors WHERE sponsor_id = ?;

-- delete matches
DELETE FROM Matches WHERE match_id = ?;

-- create coaches
INSERT INTO Coaches (first_name, last_name) VALUES (?, ?);

--create players
INSERT INTO Players (first_name, last_name, nation, phone_num, coach_id)\
    VALUES ('${data["input-first_name"]}',\
    '${data["input-last_name"]}', '${data["input-nation"]}',\
    '${phone_num}', ${data["input-coach-id"]});

--create offerings
INSERT INTO Offerings (stuff) VALUES ('${data["input-stuff"]}');

-- create tournamnets
  INSERT INTO Tournaments (year, venue, sponsor_id)\
    VALUES ('${data["input-year"]}', '${data["input-venue"]}',\
    (SELECT Sponsors.sponsor_id FROM Sponsors\
    WHERE Sponsors.sponsor_name = '${data["input-sponsor-name"]}'));

-- create sponsors
INSERT INTO Sponsors (sponsor_name, offering_id)\
    VALUES ('${data["input-name"]}','${data["input-offering"]}');

-- create matches
INSERT INTO Matches (date, player1, player2, winner, score, year) 
    VALUES (?, ?, ?, ?, ?, ? );

--update players
UPDATE Players SET\
  first_name = CASE WHEN ${first_name}\
    IS NOT NULL THEN ${first_name}\
    ELSE first_name END,
  last_name = CASE WHEN ${last_name}\
    IS NOT NULL THEN ${last_name}\
    ELSE last_name END,
  nation = CASE WHEN ${nation}\
    IS NOT NULL THEN ${nation}\
    ELSE nation END,
  phone_num = CASE WHEN ${phone_num}\
    IS NOT NULL THEN ${phone_num}\
    ELSE phone_num END,
  coach_id = CASE WHEN ${coach_id}\
    IS NOT NULL THEN ${coach_id}\
    ELSE coach_id END
  WHERE player_id = ${data["edit-player-id"]};

-- update offerings
  UPDATE Offerings SET stuff = '${
    data["edit-stuff"]
  }' WHERE offering_id = '${data["edit-id"]}';

-- update tournaments
UPDATE Tournaments SET\
  venue = CASE WHEN ${venue}\
    IS NOT NULL THEN ${venue}\
    ELSE venue END,\
  sponsor_id = CASE WHEN ${sponsor_name}\
    IS NOT NULL THEN\
      (SELECT Sponsors.sponsor_id FROM Sponsors\
      WHERE Sponsors.sponsor_name = ${sponsor_name} LIMIT 1)\
    ELSE sponsor_id END\
  WHERE year = '${data["edit-year"]}';

  -- update sponsors
  UPDATE Sponsors SET\
  offering_id = CASE WHEN ${offering}\
    IS NOT NULL THEN ${offering}\
    ELSE offering_id END\
  WHERE Sponsors.sponsor_id = ${sponsor_id};

  -- update matches
  UPDATE Matches SET score = ? WHERE Matches.match_id = ?;
