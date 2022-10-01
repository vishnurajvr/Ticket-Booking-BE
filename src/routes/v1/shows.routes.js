// Handlers
const showsHandler = require('../../handlers/shows.handler');

const showsRoutes = [
    {
        method: 'GET',
        path: '/',
        handler: showsHandler.getAllShows,
        options: { auth: false }
    }
];

module.exports = showsRoutes;