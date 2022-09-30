/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.table('Timings').insert([
        { id: 1, timing: '07.00 AM' },
        { id: 2, timing: '10.30 AM' },
        { id: 3, timing: '02.30 PM' },
        { id: 4, timing: '06.30 PM' },
        { id: 5, timing: '10.30 PM' },
    ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.table('Timings').del();
};
