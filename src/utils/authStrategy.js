// Helper
const { validateUser, validateSuperAdmin, validateAdmin, validate } = require('../helper/jwtValidate');

const authStrategy = async (server) => {
    await server.register(require('hapi-auth-jwt2'));

    server.auth.strategy('jwt-basic', 'jwt', {
        validate,
        key: process.env.JWT_SECRET
    });

    server.auth.strategy('jwt', 'jwt', {
        key: process.env.JWT_SECRET,
        validate: validateUser
    });

    server.auth.strategy('jwt-admin', 'jwt', {
        key: process.env.JWT_SECRET,
        validate: validateAdmin
    });

    server.auth.strategy('jwt-superadmin', 'jwt', {
        key: process.env.JWT_SECRET,
        validate: validateSuperAdmin
    });

    server.auth.default('jwt-basic');
}

module.exports = authStrategy;