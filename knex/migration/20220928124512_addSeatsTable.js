/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Seats', (table) => {
        table.increments('id').primary();
        table.date('date').notNullable();
        table.integer('screenId').unsigned().references('id').inTable('Screens').onDelete('CASCADE').onUpdate('CASCADE').notNullable().index();
        table.integer('timingId').unsigned().references('id').inTable('Timings').notNullable();
        table.string('seatName', 10).notNullable().index();
        table.boolean('isBooked').defaultTo(false);
        table.timestamps(true, true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('Seats');
};
