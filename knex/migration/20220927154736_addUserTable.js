/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('User', function (table) {
        table.increments('id').primary();
        table.string('name', 50).notNullable();
        table.string('password').notNullable();
        table.enu('gender', ['Male', 'Female', 'Others']);
        table.string('mobileNumber', 15).notNullable().unique();
        table.enu('role', ['superAdmin', 'admin', "user"]).defaultTo('user');
        table.timestamps(true, true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('User');
};
