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
      {id_name: 'Alex', age: 19, about_me: 'Hi I am Alex and I developed this website', password:'$2b$08$vvtnFgSpTYIKl.JeqF7P4uuNb0c23tw74vg4eCrzV8vDyCtXaWlhi'}, // password : 'password'
      {id_name: 'Easy_AI', age: null, about_me: 'I will go easy on you', password: null},
    {id_name: 'Medium_AI', age: null, about_me: 'I will make it a bit hard for you', password: null},
    {id_name: 'Hard_AI', age: null, about_me: 'I will make it a nightmare for you', password: null}
  ]);

  await knex('ttt_leaderboard').insert(
      {id_place_ttt: 1, wins: 0, draws: 0, losses: 0, id_player: 'Alex'});

  await knex('wam_leaderboard').insert(
      {id_place_wam: 1, wins: 0, losses: 0, id_player: 'Alex'});

};
