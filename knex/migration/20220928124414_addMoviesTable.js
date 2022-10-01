/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Movies', (table) => {
        table.increments('id').primary();
        table.string('name', 255).notNullable();
        table.integer('duration').notNullable();
        table.string('description', 1000);
        table.string('languages', 500);
        table.date('releaseDate').notNullable();
        table.timestamps(true, true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('Movies');
};
