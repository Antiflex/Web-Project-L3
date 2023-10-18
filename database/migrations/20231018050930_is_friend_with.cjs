/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    /* create is_friend_with join table */
    return knex.schema.createTable('is_friend_with', (table)=> {
        table.string('id_player_1',50).notNullable();
        table.string('id_player_2',50).notNullable();
        table.foreign('id_player_1').references('user_profile.id_name');
        table.foreign('id_player_2').references('user_profile.id_name');
    });
};

/*
CREATE TABLE is_friend_with(
    id_player_1 VARCHAR(50),
    id_player_2 VARCHAR(50),
    PRIMARY KEY(id_player_1, id_player_2),
    FOREIGN KEY(id_player_1) REFERENCES User_profile(id_name),
    FOREIGN KEY(id_player_2) REFERENCES User_profile(id_name)
);
*/

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('is_friend_with');
};
