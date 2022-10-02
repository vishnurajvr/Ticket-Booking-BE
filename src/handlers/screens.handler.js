// Helpers
const Response = require('../utils/response');
const screenService = require('../service/screens.service');
const commonSchma = require('../validation/schema/common.schema');
const { screenSchema } = require('../validation/schema/screen.schema');

class ScreenHandler { }

ScreenHandler.createScreen = async (req, res) => {
    try {

        let payload = req.payload;
        await screenSchema.validateAsync(payload);

        const result = await screenService.createScreen(payload);
        return res.response(result).code(result.status);

    } catch (e) {
        return Response.error(e);
    }
}

ScreenHandler.updateScreen = async (req, res) => {
    try {

        let params = req.params;
        let payload = req.payload;
        await screenSchema.validateAsync(payload);
        await commonSchma.paramsIdSchema.validateAsync(params);

        const result = await screenService.updateScreen(params, payload);
        return res.response(result).code(result.status);

    } catch (e) {
        return Response.error(e);
    }
}

ScreenHandler.deleteScreen = async (req, res) => {
    try {

        let params = req.params;
        await commonSchma.paramsIdSchema.validateAsync(params);

        const result = await screenService.deleteScreen(params);
        return res.response(result).code(result.status);

    } catch (e) {
        return Response.error(e);
    }
}


ScreenHandler.getAllScreen = async (req, res) => {
    try {

        let query = req.query;
        let userData = req.auth.credentials;

        query = await commonSchma.pageSchema.validateAsync(query);

        const result = await screenService.getAllScreen(query, userData);
        return res.response(result).code(result.status);

    } catch (e) {
        console.log({ e })
        return Response.error(e);
    }
}


ScreenHandler.getScreenById = async (req, res) => {
    try {

        let params = req.params;

        await commonSchma.paramsIdSchema.validateAsync(params);

        const result = await screenService.getScreenById(params);
        return res.response(result).code(result.status);

    } catch (e) {
        console.log({ e })
        return Response.error(e);
    }
}

module.exports = ScreenHandler;