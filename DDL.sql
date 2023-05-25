SET FOREIGN_KEY_CHECKS = 0;
SET AUTOCOMMIT = 0;

-- Create Tables

DROP TABLE IF EXISTS Offerings;
CREATE TABLE Offerings (
  offering_id int(11) NOT NULL AUTO_INCREMENT,
  stuff varchar(255) NOT NULL,
  PRIMARY KEY (offering_id)
);

DROP TABLE IF EXISTS Sponsors;
CREATE TABLE Sponsors (
    sponsor_id int(11) NOT NULL AUTO_INCREMENT,
    sponsor_name varchar(255) NOT NULL,
    offering_id int(11) NOT NULL,
    PRIMARY KEY (sponsor_id),
    FOREIGN KEY (offering_id) REFERENCES Offerings(offering_id)
);

DROP TABLE IF EXISTS Tournaments;
CREATE TABLE Tournaments (
  year YEAR NOT NULL UNIQUE,
  venue varchar(255) NOT NULL,
  sponsor_id int(11),

  PRIMARY KEY (year),
  FOREIGN KEY (sponsor_id) REFERENCES Sponsors(sponsor_id)
);





DROP TABLE IF EXISTS Coaches;
CREATE TABLE Coaches (
  coach_id int NOT NULL AUTO_INCREMENT,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL,
  PRIMARY KEY (coach_id)
);

DROP TABLE IF EXISTS Players;
CREATE TABLE Players (
  player_id int(11) NOT NULL AUTO_INCREMENT,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL,
  nation varchar(255) NOT NULL,
  phone_num varchar(15) UNIQUE NOT NULL, 
  coach_id int(11),

  PRIMARY KEY (player_id),
  FOREIGN KEY (coach_id) REFERENCES Coaches(coach_id)
);


DROP TABLE IF EXISTS Matches;
CREATE TABLE Matches (
    match_id int(11) NOT NULL AUTO_INCREMENT,
    date date NOT NULL,
    player1 int(11) NOT NULL,
    player2 int(11) NOT NULL,
    winner int(11) NOT NULL,
    score varchar(255) NOT NULL,
    year YEAR NOT NULL,

    PRIMARY KEY (match_id),
    FOREIGN KEY (player1) REFERENCES Players(player_id),
    FOREIGN KEY (player2) REFERENCES Players(player_id), 
    FOREIGN KEY (winner) REFERENCES Players(player_id),
    FOREIGN KEY (year) REFERENCES Tournaments(year)
);




-- insert data


INSERT INTO Coaches (first_name, last_name)
VALUES ('Andrew', 'Blandy'),
('Michel', 'Woodhouse'),
('Siner', 'William');

INSERT INTO Players (first_name, last_name, nation, phone_num, coach_id)
VALUES ('Roger', 'Federer', 'Switzerland', '541-358-8473',
    (SELECT coach_id FROM Coaches WHERE first_name = 'Andrew' AND last_name = 'Blandy')
),
('Novac', 'Djokovic', 'Serbia', 434-454-8574,
    (SELECT coach_id FROM Coaches WHERE first_name = 'Siner' AND last_name = 'William')
),
('Rafael', 'Nadal', 'Spain', 746-382-3457,
    (SELECT coach_id FROM Coaches WHERE first_name = 'Michel' AND last_name = 'Woodhouse')
);


INSERT INTO Offerings (stuff)
VALUES ('money'), ('balls'), ('socks');

INSERT INTO Sponsors (sponsor_name, offering_id)
VALUES ('Yonex', (SELECT offering_id FROM Offerings WHERE stuff = 'balls')),
('Yonex', (SELECT offering_id FROM Offerings WHERE stuff = 'money')),
('Asics', (SELECT offering_id FROM Offerings WHERE stuff = 'money')),
('US bank', (SELECT offering_id FROM Offerings WHERE stuff = 'money'));

INSERT INTO Tournaments (year, venue, sponsor_id)
VALUES (2018, 'New York Tennis Garden', 1),
(2019, 'California City Park', 2),
(2021, 'Portland Sports Arena', 1),
(2022, 'Los Angeles Tennis Park', 3);

INSERT INTO Matches (date, player1, player2, winner, score, year)
VALUES ('9/20/2019',
    (SELECT player_id FROM Players WHERE first_name = 'Roger' AND last_name = 'Federer'),
    (SELECT player_id FROM Players WHERE first_name = 'Novac' AND last_name = 'Djokovic'),
    (SELECT player_id FROM Players WHERE first_name = 'Novac' AND last_name = 'Djokovic'),
    '6-1, 6-4',
    (SELECT year FROM Tournaments WHERE year = '2019')),
(
    '9/20/2021',
    (SELECT player_id FROM Players WHERE first_name = 'Rafael' AND last_name = 'Nadal'),
    (SELECT player_id FROM Players WHERE first_name = 'Roger' AND last_name = 'Federer'),
    (SELECT player_id FROM Players WHERE first_name = 'Roger' AND last_name = 'Federer'),
    '6-3, 4-6, 7-5',
    (SELECT year FROM Tournaments WHERE year = '2021')),
(
    '9/28/2022',
    (SELECT player_id FROM Players WHERE first_name = 'Novac' AND last_name = 'Djokovic'),
    (SELECT player_id FROM Players WHERE first_name = 'Rafael' AND last_name = 'Nadal'),
    (SELECT player_id FROM Players WHERE first_name = 'Rafael' AND last_name = 'Nadal'),
    '0-6, 6-2, 7-5',
    (SELECT year FROM Tournaments WHERE year = '2022')
);


SET FOREIGN_KEY_CHECKS=1;
COMMIT;
