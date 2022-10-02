// Handlers
const ReservationHandler = require('../../handlers/reservation.handler');

const moviesRoutes = [
    {
        method: 'POST',
        path: '/create',
        handler: ReservationHandler.createReservation,
        options: { auth: 'jwt' }
    },
    {
        method: 'GET',
        path: '/{id}',
        handler: ReservationHandler.getReservationById,
        options: { auth: 'jwt' }
    },
    {
        method: 'GET',
        path: '/',
        handler: ReservationHandler.getAllReservation,
        options: { auth: 'jwt' }
    },
];

module.exports = moviesRoutes;