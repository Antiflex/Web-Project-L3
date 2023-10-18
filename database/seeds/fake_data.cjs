/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('is_friend_with').del();
  await knex('game_session').del();
  await knex('wam_leaderboard').del();
  await knex('ttt_leaderboard').del();
  await knex('user_profile').del();


  await knex('user_profile').insert([
    {id_name: 'Alex', age: 19, about_me: 'Hi I am Alex and I like playing here', password:'$2b$08$vvtnFgSpTYIKl.JeqF7P4uuNb0c23tw74vg4eCrzV8vDyCtXaWlhi'}, // password : 'password'
    {id_name: 'Kwentyne', age: 19, about_me: 'Hi I was brought here by force', password: 'j\'adore rire'}, // password : 'j'adore rire'
    {id_name: 'Max', age: 20, about_me: 'Hi I may or may not be a human', password: 'j\'adore TayTay'},
    {id_name: 'Nico', age: 20, about_me: 'Hi I actually am not Pamela', password: 'je suis pamela'},
    {id_name: 'Easy_AI', age: null, about_me: 'I will go easy on you', password: null},
    {id_name: 'Medium_AI', age: null, about_me: 'I will make it a bit hard for you', password: null},
    {id_name: 'Hard_AI', age: null, about_me: 'I will make it a nightmare for you', password: null},
  ]);

  await knex('ttt_leaderboard').insert([
    {id_place_ttt: 1, wins: 2, draws: 0, losses: 0, id_player: 'Alex'},
    {id_place_ttt: 2, wins: 1, draws: 1, losses: 0, id_player: 'Kwentyne'},
    {id_place_ttt: 3, wins: 0, draws: 0, losses: 0, id_player: 'Max'},
    {id_place_ttt: 4, wins: 0, draws: 0, losses: 0, id_player: 'Nico'}
  ])

  await knex('wam_leaderboard').insert([
    {id_place_wam: 1, wins: 1, losses: 0, id_player: 'Kwentyne'},
    {id_place_wam: 2, wins: 1, losses: 1, id_player: 'Alex'},
    {id_place_wam: 3, wins: 0, losses: 0, id_player: 'Max'},
    {id_place_wam: 4, wins: 0, losses: 0, id_player: 'Nico'}
  ])

  await knex('game_session').insert([
    {game_type:'TTT', game_result:'WIN', game_date: new Date('2023-09-01 13:11'), id_player_1: 'Alex', id_player_2:'Medium_AI'},
    {game_type:'TTT', game_result:'WIN', game_date: new Date('2023-09-01 13:15'), id_player_1: 'Alex', id_player_2:'Hard_AI'},
    {game_type:'WAM', game_result:'WIN', game_date: new Date('2023-09-22 10:42'), id_player_1: 'Alex', id_player_2:'Easy_AI'},
    {game_type:'WAM', game_result:'LOSS', game_date: new Date('2023-09-22 10:42'), id_player_1: 'Alex', id_player_2:'Hard_AI'},
    {game_type:'TTT', game_result:'WIN', game_date: new Date('2023-09-21 17:51'), id_player_1: 'Kwentyne', id_player_2:'Medium_AI'},
    {game_type:'TTT', game_result:'DRAW', game_date: new Date('2023-09-21 17:52'), id_player_1: 'Kwentyne', id_player_2:'Hard_AI'},
    {game_type:'WAM', game_result:'WIN', game_date: new Date('2023-09-21 10:42'), id_player_1: 'Kwentyne', id_player_2:'Easy_AI'},
    {game_type:'WAM', game_result:'WIN', game_date: new Date('2023-09-21 10:42'), id_player_1: 'Kwentyne', id_player_2:'Hard_AI'},
  ])

  await knex('is_friend_with').insert([
    {id_player_1: 'Alex', id_player_2: 'Kwentyne'},
    {id_player_1: 'Alex', id_player_2: 'Max'},
    {id_player_1: 'Alex', id_player_2: 'Nico'},
    {id_player_1: 'Kwentyne', id_player_2: 'Max'},
    {id_player_1: 'Kwentyne', id_player_2: 'Nico'},
    {id_player_1: 'Max', id_player_2: 'Nico'}
  ])
};

/*
INSERT INTO Is_friend_with(id_player_1, id_player_2) VALUES
('Alex','Kwentyne'),
('Alex','Max'),
('Alex','Nico'),
('Kwentyne','Max'),
('Kwentyne','Nico'),
('Max','Nico');
 */