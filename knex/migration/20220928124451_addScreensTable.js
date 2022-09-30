/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('Screens', (table) => {
        table.increments('id').primary();
        table.string('name', 255).notNullable();
        table.string('description', 1000);
        table.float('price').defaultTo(0);
        table.integer('rowsCount').notNullable();
        table.integer('columnsCount').notNullable();
        table.integer('movieId').unsigned().references('id').inTable('Movies').onDelete('CASCADE').onUpdate('CASCADE').index();
        table.integer('theatreId').unsigned().references('id').inTable('Theatres').onDelete('CASCADE').onUpdate('CASCADE').notNullable().index();
        table.integer('totalSeats').notNullable();
        table.boolean('isAvailable').defaultTo(true);
        table.timestamps(true, true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('Screens');
};
