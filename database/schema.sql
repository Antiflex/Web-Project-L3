DROP TABLE IF EXISTS Is_friend_with;
DROP TABLE IF EXISTS Game_session;
DROP TABLE IF EXISTS WAM_leaderboard;
DROP TABLE IF EXISTS TTT_leaderboard;
DROP TABLE IF EXISTS User_profile;

CREATE TABLE User_profile(
	id_name VARCHAR(50),
	age SMALLINT,
	about_me VARCHAR(200),
	password VARCHAR(50),
	PRIMARY KEY(id_name)
);

CREATE TABLE TTT_leaderboard(
   id_place_TTT INT,
   wins INT,
   draws INT,
   losses INT,
   id_player VARCHAR(50) NOT NULL,
   PRIMARY KEY(id_place_TTT),
   UNIQUE(id_player),
   FOREIGN KEY(id_player) REFERENCES User_profile(id_name)
);

CREATE TABLE WAM_leaderboard(
   id_place_WAM INT,
   wins INT,
   losses INT,
   total_score INT,
   id_player VARCHAR(50) NOT NULL,
   PRIMARY KEY(id_place_WAM),
   UNIQUE(id_player),
   FOREIGN KEY(id_player) REFERENCES User_profile(id_name)
);

CREATE TABLE Game_session( 
	session_id SERIAL,
	game_type char(3),
	game_result varchar(4),
	game_date TIMESTAMP,
	id_player_1 VARCHAR(50) NOT NULL,
	id_player_2 VARCHAR(50) NOT NULL,
	PRIMARY KEY(session_id),
	FOREIGN KEY(id_player_1) REFERENCES User_profile(id_name),
	FOREIGN KEY(id_player_2) REFERENCES User_profile(id_name),
	-- Indicates whether it's a Tic-Tac-Toe or Whack-a-Mole game
	CHECK (game_type in('TTT', 'WAM')),
	CHECK (game_result in ('WIN', 'DRAW', 'LOSS'))
);

CREATE TABLE is_friend_with(
   id_player_1 VARCHAR(50),
   id_player_2 VARCHAR(50),
   PRIMARY KEY(id_player_1, id_player_2),
   FOREIGN KEY(id_player_1) REFERENCES User_profile(id_name),
   FOREIGN KEY(id_player_2) REFERENCES User_profile(id_name)
);
