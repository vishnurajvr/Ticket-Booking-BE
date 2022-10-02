// Helpers
const Response = require('../utils/response');
const theatreSevice = require('../service/theatre.service');
const theatreSchema = require('../validation/schema/theatre.schema');

class TheatreHandler { }

TheatreHandler.createTheatre = async (req, res) => {
    try {

        const payload = req.payload;
        const userData = req.auth.credentials;

        await theatreSchema.createTheatre.validateAsync(payload);

        const result = await theatreSevice.createTheatre(payload, userData);
        return res.response(result).code(result.status);

    } catch (e) {
        return Response.error(e);
    }
}

TheatreHandler.updateTheatre = async (req, res) => {
    try {

        const params = req.params;
        const payload = req.payload;

        await theatreSchema.theatreParams.validateAsync(params);
        await theatreSchema.updateTheatre.validateAsync(payload);

        const result = await theatreSevice.updateTheatre(params, payload);
        return res.response(result).code(result.status);

    } catch (e) {
        return Response.error(e);
    }
}

TheatreHandler.getAllTheatre = async (req, res) => {
    try {

        let query = req.query;
        const userData = req.auth.credentials || {};

        query = await theatreSchema.theatreQuery.validateAsync(query);

        const result = await theatreSevice.getAllTheatre(query, userData);
        return res.response(result).code(result.status);

    } catch (e) {
        return Response.error(e);
    }
}

TheatreHandler.getTheatreById = async (req, res) => {
    try {

        const params = req.params;
        const userData = req.auth.credentials || {};

        await theatreSchema.theatreParams.validateAsync(params);

        const result = await theatreSevice.getTheatreById(params, userData);
        return res.response(result).code(result.status);

    } catch (e) {
        return Response.error(e);
    }
}

TheatreHandler.deleteTheatre = async (req, res) => {
    try {

        const params = req.params;

        await theatreSchema.theatreParams.validateAsync(params);

        const result = await theatreSevice.deleteTheatre(params);
        return res.response(result).code(result.status);

    } catch (e) {
        return Response.error(e);
    }
}

TheatreHandler.getTheatresByMovieId = async (req, res) => {
    try {

        let query = req.query;
        let params = req.params;

        query = await theatreSchema.theatreQuery.validateAsync(query);
        params = await theatreSchema.getMoviesSchema.validateAsync(params);

        const result = await theatreSevice.getTheatresByMovieId(params, query);
        return res.response(result).code(result.status);

    } catch (e) {
        return Response.error(e);
    }
}

module.exports = TheatreHandler;