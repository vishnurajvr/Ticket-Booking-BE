// Routes
const { showsRoutes } = require('../routes');

module.exports = {
    name: 'shows-plugin',
    version: '1.0.0',
    register: (server, _options) => {

        server.route(showsRoutes);
    }
};