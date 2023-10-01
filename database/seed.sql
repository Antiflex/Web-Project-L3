DELETE FROM Is_friend_with;
DELETE FROM TTT_leaderboard;
DELETE FROM WAM_leaderboard;
DELETE FROM Game_session;
DELETE FROM User_profile;

INSERT INTO User_profile(id_name, age, about_me, password) VALUES
('Alex', 19, 'Hi I am Alex and I like playing here', 'really secured password'), -- this user has already played a few games
('Kwentyne', 19, 'Hi I was brought here by force', 'j''adore rire'), -- this user too
('Max', 20, 'Hi I am a human', 'j''adore mourir'), -- this user has an account but never played
('Nico', 20, 'Hi I actually am not Pamela', 'je suis pamela'), -- this one either
-- These are bots that won't appear in the leaderboard
('Easy_AI', NULL, 'I will go easy on you', NULL),
('Medium_AI', NULL, 'I will make it a bit hard for you', NULL),
('Hard_AI', NULL, 'I will make it a nightmare for you', NULL);

INSERT INTO TTT_leaderboard(id_place_ttt, wins, draws, losses, id_player) VALUES
(1, 2, 0, 0, 'Alex'),
(2, 1, 1, 0, 'Kwentyne'),
(3, 0, 0, 0, 'Max'),
(4, 0, 0, 0, 'Nico');

INSERT INTO WAM_leaderboard(id_place_wam, wins, losses, total_score, id_player) VALUES
(1, 1, 0, 20, 'Kwentyne'),
(2, 1, 1, 5, 'Alex'),
(3, 0, 0, 0, 'Max'),
(4, 0, 0, 0, 'Nico');

INSERT INTO Game_session(session_id, game_type, game_result, game_date, id_player_1, id_player_2) VALUES
(1, 'TTT', 'WIN', TO_TIMESTAMP('2023-09-01 13:11', 'YYYY-MM-DD HH24:MI'), 'Alex', 'Medium_AI'),
(2, 'TTT', 'WIN', TO_TIMESTAMP('2023-09-01 13:15', 'YYYY-MM-DD HH24:MI'), 'Alex', 'Hard_AI'),
(3, 'TTT', 'WIN', TO_TIMESTAMP('2023-09-21 17:51', 'YYYY-MM-DD HH24:MI'), 'Kwentyne', 'Medium_AI'),
(4, 'TTT', 'DRAW', TO_TIMESTAMP('2023-09-21 17:52', 'YYYY-MM-DD HH24:MI'), 'Kwentyne', 'Hard_AI'),
(5, 'WAM', 'WIN', TO_TIMESTAMP('2023-09-21 18:11', 'YYYY-MM-DD HH24:MI'), 'Kwentyne', 'Easy_AI'),
(6, 'WAM', 'WIN', TO_TIMESTAMP('2023-09-21 18:13', 'YYYY-MM-DD HH24:MI'), 'Kwentyne', 'Hard_AI'),
(7, 'WAM', 'WIN', TO_TIMESTAMP('2023-09-22 10:42', 'YYYY-MM-DD HH24:MI'), 'Alex', 'Easy_AI'),
(8, 'WAM', 'LOSS', TO_TIMESTAMP('2023-09-22 10:42', 'YYYY-MM-DD HH24:MI'), 'Alex', 'Hard_AI');

INSERT INTO Is_friend_with(id_player_1, id_player_2) VALUES
('Alex','Kwentyne'),
('Alex','Max'),
('Alex','Nico'),
('Kwentyne','Max'),
('Kwentyne','Nico'),
('Max','Nico');