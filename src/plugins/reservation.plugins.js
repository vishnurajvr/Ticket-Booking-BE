// Routes
const { reservationRoutes } = require('../routes');

module.exports = {
    name: 'reservation-plugin',
    version: '1.0.0',
    register: (server, _options) => {

        server.route(reservationRoutes);
    }
};