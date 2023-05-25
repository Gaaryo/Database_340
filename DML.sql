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


-- delete player
DELETE FROM Matches
WHERE player1 = (SELECT player_id FROM Players WHERE first_name = :fnameInput AND last_name = :lnameInput)
    OR player2 = (SELECT player_id FROM Players WHERE first_name = :fnameInput AND last_name = :lnameInput)
    OR winner = (SELECT player_id FROM Players WHERE first_name = :fnameInput AND last_name = :lnameInput);
DELETE FROM players WHERE first_name = :fnameInput AND last_name = :lnameInput;
