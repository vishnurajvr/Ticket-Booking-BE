/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('Screens', (table) => {
        table.increments('id').primary();
        table.string('name', 255).notNullable();
        table.integer('movieId').unsigned().references('id').inTable('Movies').onDelete('CASCADE').onUpdate('CASCADE').index();
        table.integer('theatreId').unsigned().references('id').inTable('Theatres').onDelete('CASCADE').onUpdate('CASCADE').notNullable().index();
        table.integer('rowCount').notNullable();
        table.integer('columnCount').notNullable();
        table.integer('totalSeats').notNullable();
        table.boolean('isAvailable').defaultTo(true);
        table.date('startDate').notNullable();
        table.date('endDate').notNullable();
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
