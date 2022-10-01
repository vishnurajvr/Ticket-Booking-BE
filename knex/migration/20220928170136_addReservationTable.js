/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('Reservation', (table) => {
        table.increments('id').primary();
        table.date('date').notNullable();
        table.float('amount').defaultTo(0);
        table.integer('totalSeats').notNullable();
        table.integer('userId').unsigned().references('id').inTable('User').onDelete('CASCADE').onUpdate('CASCADE').notNullable().index();
        table.integer('theatreId').unsigned().references('id').inTable('Theatres').onDelete('CASCADE').onUpdate('CASCADE').notNullable();
        table.integer('screenId').unsigned().references('id').inTable('Screens').onDelete('CASCADE').onUpdate('CASCADE').notNullable();
        table.integer('timingId').unsigned().references('id').inTable('Timings').onDelete('CASCADE').onUpdate('CASCADE').notNullable();
        table.integer('movieId').unsigned().references('id').inTable('Movies').onDelete('CASCADE').onUpdate('CASCADE').notNullable();
        table.timestamps(true, true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('Reservation');
};
