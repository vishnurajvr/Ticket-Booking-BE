// Routes
const { moviesRoutes } = require('../routes');

module.exports = {
    name: 'movies-plugin',
    version: '1.0.0',
    register: (server, _options) => {

        server.route(moviesRoutes);
    }
};