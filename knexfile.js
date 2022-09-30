require('dotenv').config();
const { knexSnakeCaseMappers } = require('objection');
// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const commonConfig = {
    client: process.env.DB_CLIENT,
    connection: {
        port: process.env.DB_PORT,
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
    },
    log: {
        warn: console.log,
        debug: console.log,
        error: console.log,
        enableColors: true,
    },
    migrations: {
        directory: __dirname + '/knex/migration'
    },
    seeds: {
        directory: __dirname + '/knex/seeds'
    },
    debug: true,

    /*
    @NOTE: convert camelCase to snakeCase -> createdAt -> created_at

    we don't need for created_at:createdAt. 
    It will automatically updated when we use createdAt to insert or update the record
    */

    ...knexSnakeCaseMappers
};

module.exports = {
    development: commonConfig,
    staging: commonConfig,
    production: commonConfig,
};
