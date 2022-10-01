/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function (knex) {
    return knex.schema.createTable('ReservationSeats', (table) => {
        table.increments('id').primary();
        table.integer('userId').unsigned().references('id').inTable('User').onDelete('CASCADE').onUpdate('CASCADE').notNullable();
        table.integer('seatsId').unsigned().references('id').inTable('Seats').onDelete('CASCADE').onUpdate('CASCADE').notNullable();
        table.integer('reservationId').unsigned().references('id').inTable('Reservation').onDelete('CASCADE').onUpdate('CASCADE').notNullable();
        table.timestamps(true, true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('ReservationSeats');
};
