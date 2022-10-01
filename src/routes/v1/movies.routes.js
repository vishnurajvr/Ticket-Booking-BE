// Handlers
const movieHandler = require('../../handlers/movies.handler');

const moviesRoutes = [
    {
        method: 'POST',
        path: '/create',
        handler: movieHandler.createMovie,
        options: { auth: 'jwt-superadmin' }
    },
    {
        method: 'PUT',
        path: '/update/{id}',
        handler: movieHandler.updateMovie,
        options: { auth: 'jwt-superadmin' }
    },
    {
        method: 'DELETE',
        path: '/delete/{id}',
        handler: movieHandler.deleteMovie,
        options: { auth: 'jwt-superadmin' }
    },
    {
        method: 'GET',
        path: '/{id}',
        handler: movieHandler.getMoviesById
    },
    {
        method: 'GET',
        path: '/',
        handler: movieHandler.getAllMovies
    },
];

module.exports = moviesRoutes;