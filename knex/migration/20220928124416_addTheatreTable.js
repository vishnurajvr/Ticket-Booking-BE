/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('Theatres', (table) => {
        table.increments('id').primary();
        table.string('name', 100).notNullable();
        table.integer('userId').unsigned().references('id').inTable('User').onDelete('CASCADE').onUpdate('CASCADE').notNullable().index();
        table.boolean('isOpened').defaultTo(true);
        table.timestamps(true, true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('Theatres');
};
