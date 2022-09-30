// Routes
const { userRoutes } = require('../routes');

module.exports = {
    name: 'user-plugin',
    version: '1.0.0',
    register: (server, _options) => {

        server.route(userRoutes);
    }
};