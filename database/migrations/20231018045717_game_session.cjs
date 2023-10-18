/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    /* create game_session table */
    return knex.schema.createTable('game_session', (table)=> {
        table.increments('session_id').primary();
        table.string('game_type',3);
        table.string('game_result',4);
        table.timestamp('game_date');
        table.string('id_player_1',50).notNullable();
        table.string('id_player_2',50).notNullable();
        table.foreign('id_player_1').references('user_profile.id_name');
        table.foreign('id_player_2').references('user_profile.id_name');
        table.check("game_type in ('WAM','TTT')");
        table.check("game_result in ('WIN','DRAW','LOSS')");
    });
};

/*
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
*/

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('game_session');
};
