// Helpers
const Response = require('../utils/response');
const userService = require('../service/user.service');
const userSchemas = require('../validation/schema/user.schema');

class UserHandler { }

UserHandler.signUp = async (req, res) => {
    try {

        const payload = req.payload;

        await userSchemas.signUpSchema.validateAsync(payload);

        const result = await userService.signUp(payload);
        return res.response(result).code(result.status);

    } catch (e) {
        return Response.error(e);
    }
}

UserHandler.login = async (req, res) => {
    try {

        const payload = req.payload;

        await userSchemas.loginSchema.validateAsync(payload);

        const result = await userService.login(req.payload);
        return res.response(result).code(result.status);

    } catch (e) {
        return Response.error(e);
    }
}

module.exports = UserHandler;