/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Sections', (table) => {
        table.increments('id').primary();
        table.float('amount').notNullable();
        table.string('name').notNullable();
        table.integer('rowCount').notNullable();
        table.integer('columnCount').notNullable();
        table.integer('totalSeats').notNullable();
        table.integer('screenId').unsigned().references('id').inTable('Screens').onDelete('CASCADE').onUpdate('CASCADE').notNullable();
        table.timestamps(true, true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('Sections');
};
