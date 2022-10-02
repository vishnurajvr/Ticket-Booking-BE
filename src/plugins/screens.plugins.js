// Routes
const { screenRoutes } = require('../routes');

module.exports = {
    name: 'screen-plugin',
    version: '1.0.0',
    register: (server, _options) => {

        server.route(screenRoutes);
    }
};