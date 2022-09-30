// Routes
const { theatreRoutes } = require('../routes');

module.exports = {
    name: 'theatre-plugin',
    version: '1.0.0',
    register: (server, _options) => {

        server.route(theatreRoutes);
    }
};