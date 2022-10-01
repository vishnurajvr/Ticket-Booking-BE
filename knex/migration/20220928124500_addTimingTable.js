/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('Timings', (table) => {
        table.increments('id').primary();
        table.string('timing',50).notNullable();
        table.string('displayTime', 50).notNullable();
        table.integer('screenId').unsigned().references('id').inTable('Screens').onDelete('CASCADE').onUpdate('CASCADE').notNullable();
        table.timestamps(true, true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('Timings');
};
