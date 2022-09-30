require('dotenv').config();

const Hapi = require('@hapi/hapi');

// DB connection
const db = require('./src/database/db.config');

// Plugins
const plugins = require('./src/plugins');

// Helper
const authStrategy = require('./src/utils/authStrategy');

const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
});

server.events.on('response', function ({ info: { remoteAddress }, method, path, response: { statusCode } }) {
    console.log(`${remoteAddress} : ${method.toUpperCase()} ${path} - ${statusCode}`);
});

const init = async () => {

    await authStrategy(server);

    await plugins(server);

    await server.start();
    console.log(`Server started on ${process.env.PORT}`);
}

init();

process.on('unhandledRejection', err => {
    console.log(err);
    console.log('-'.repeat(500));
    process.exit(1);
});