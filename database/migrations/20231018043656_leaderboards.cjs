/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return Promise.all([

        /* CREATE ttt_leaderboard table */
        knex.schema.createTable('ttt_leaderboard', (table)=> {
            table.integer('id_place_ttt', 50).primary();
            table.integer('wins');
            table.integer('draws');
            table.integer('losses');
            table.string('id_player', 50).unique().notNullable();
            table.foreign('id_player').references('user_profile.id_name');
        }),

        /* CREATE wam_leaderboard table */
        knex.schema.createTable('wam_leaderboard', (table)=> {
            table.integer('id_place_wam', 50).primary();
            table.integer('wins');
            table.integer('losses');
            table.string('id_player', 50).unique().notNullable();
            table.foreign('id_player').references('user_profile.id_name');
        })
    ]);
};

/*
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
 id_player VARCHAR(50) NOT NULL,
 PRIMARY KEY(id_place_WAM),
 UNIQUE(id_player),
 FOREIGN KEY(id_player) REFERENCES User_profile(id_name)
 );
 */


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return Promise.all([
        knex.schema.dropTableIfExists('ttt_leaderboard'),
        knex.schema.dropTableIfExists('wam_leaderboard')
    ]);
};
