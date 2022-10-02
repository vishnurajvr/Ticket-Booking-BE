// Handlers
const theatreHandler = require('../../handlers/theatre.handler');

const theatreRoutes = [
    {
        method: 'POST',
        path: '/create',
        handler: theatreHandler.createTheatre,
        options: { auth: 'jwt-superadmin' }
    },
    {
        method: 'PUT',
        path: '/update/{id}',
        handler: theatreHandler.updateTheatre,
        options: { auth: 'jwt-superadmin' }
    },
    {
        method: 'DELETE',
        path: '/delete/{id}',
        handler: theatreHandler.deleteTheatre,
        options: { auth: 'jwt-superadmin' }
    },

    {
        method: 'GET',
        path: '/{id}',
        handler: theatreHandler.getTheatreById
    },
    {
        method: 'GET',
        path: '/',
        handler: theatreHandler.getAllTheatre
    },
    {
        method: 'GET',
        path: '/movie/{movieId}',
        handler: theatreHandler.getTheatresByMovieId
    }
];

module.exports = theatreRoutes;