/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    /* create user_profile table */
    return knex.schema.createTable('user_profile', (table)=> {
        table.string('id_name',50).primary();
        table.smallint('age');
        table.string('about_me',200);
        table.string('password',255);
    });
};

 /*
CREATE TABLE User_profile(
	id_name VARCHAR(50),
	age SMALLINT,
	about_me VARCHAR(200),
	password VARCHAR(255) NOT NULL,
	PRIMARY KEY(id_name)
);
 */

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('user_profile');
};
