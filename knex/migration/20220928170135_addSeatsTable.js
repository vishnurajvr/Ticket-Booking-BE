/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('Seats', (table) => {
        table.increments('id').primary();
        table.string('name');
        table.string('seatsRowName').notNullable();
        table.enu('status', ['available', 'unavailable', 'hidden']);
        table.integer('sectionId').unsigned().references('id').inTable('Sections').onDelete('CASCADE').onUpdate('CASCADE').notNullable();
        table.timestamps(true, true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('Seats');
};
