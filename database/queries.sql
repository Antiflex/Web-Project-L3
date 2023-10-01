-- selects the name and age of every user in alphabetical order
SELECT id_name, age, about_me
FROM User_profile
ORDER BY id_name;

-- shows the mean age of every user
SELECT AVG(age) as "mean age"
FROM User_profile;

-- shows the opponents that the player ranked first in TTT played against in TTT
SELECT DISTINCT id_player_2 
FROM TTT_leaderboard 
JOIN Game_session 
ON id_player = id_player_1 OR id_player = id_player_2
WHERE game_type='TTT' AND id_place_ttt=1; 

-- shows the stats on the leaderboard of Nico's friends
SELECT id_place_wam, wins, losses, total_score, id_player
FROM WAM_leaderboard
JOIN is_friend_with
ON WAM_leaderboard.id_player = is_friend_with.id_player_1
WHERE id_player_2 = 'Nico'
UNION
SELECT id_place_wam, wins, losses, total_score, id_player
FROM WAM_leaderboard
JOIN is_friend_with
ON WAM_leaderboard.id_player = is_friend_with.id_player_2
WHERE id_player_1 = 'Nico'
ORDER BY id_place_wam;

-- counts the total amount of games played by each player in every game
SELECT id_player, 
TTT_leaderboard.wins + WAM_leaderboard.wins + TTT_leaderboard.draws
+ TTT_leaderboard.losses + WAM_leaderboard.losses as "Number of games played"
FROM WAM_leaderboard
JOIN TTT_leaderboard
USING(id_player);