// Handlers
const screenHandler = require('../../handlers/screens.handler');

const screenRoutes = [
    {
        method: 'POST',
        path: '/create',
        handler: screenHandler.createScreen,
        options: { auth: 'jwt-admin' }
    },
    {
        method: 'PUT',
        path: '/update/{id}',
        handler: screenHandler.updateScreen,
        options: { auth: 'jwt-admin' }
    },
    {
        method: 'DELETE',
        path: '/delete/{id}',
        handler: screenHandler.deleteScreen,
        options: { auth: 'jwt-admin' }
    },
    {
        method: 'GET',
        path: '/{id}',
        handler: screenHandler.getScreenById,
        options: { auth: false }
    },
    {
        method: 'GET',
        path: '/',
        handler: screenHandler.getAllScreen,
        options: { auth: 'jwt-basic' }
    }
];

module.exports = screenRoutes;