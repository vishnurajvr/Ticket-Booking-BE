// Handlers
const userHandler = require('../../handlers/user.handler');

const userRoutes = [
    {
        method: 'POST',
        path: '/login',
        handler: userHandler.login,
        options: { auth: false }
    },
    {
        method: 'POST',
        path: '/signup',
        handler: userHandler.signUp,
        options: { auth: false }
    },
];

module.exports = userRoutes;