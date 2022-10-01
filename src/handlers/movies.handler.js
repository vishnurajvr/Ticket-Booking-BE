// Helpers
const Response = require('../utils/response');
const moviesService = require('../service/movies.service');
const commonSchma = require('../validation/schema/common.schema');
const movieSchema = require('../validation/schema/movies.schmea');

class MoviesHandler { }

MoviesHandler.getAllMovies = async (req, res) => {
    try {

        let query = req.query;

        query = await commonSchma.pageSchema.validateAsync(query);

        const result = await moviesService.getAllMovies(query);
        return res.response(result).code(result.status);

    } catch (e) {
        return Response.error(e);
    }
}

MoviesHandler.getMoviesById = async (req, res) => {
    try {

        let params = req.params;

        params = await commonSchma.paramsIdSchema.validateAsync(params);

        const result = await moviesService.getMoviesById(params);
        return res.response(result).code(result.status);

    } catch (e) {
        return Response.error(e);
    }
}

MoviesHandler.createMovie = async (req, res) => {
    try {

        const payload = req.payload;

        await movieSchema.createMovieSchema.validateAsync(payload);

        const result = await moviesService.createMovie(payload);
        return res.response(result).code(result.status);

    } catch (e) {
        return Response.error(e);
    }
}

MoviesHandler.updateMovie = async (req, res) => {
    try {

        let params = req.params;
        const payload = req.payload;

        params = await commonSchma.paramsIdSchema.validateAsync(params);
        await movieSchema.createMovieSchema.validateAsync(payload);

        const result = await moviesService.updateMovie(params, payload);
        return res.response(result).code(result.status);

    } catch (e) {
        return Response.error(e);
    }
}

MoviesHandler.deleteMovie = async (req, res) => {
    try {

        let params = req.params;

        params = await commonSchma.paramsIdSchema.validateAsync(params);

        const result = await moviesService.deleteMovie(params);
        return res.response(result).code(result.status);

    } catch (e) {
        return Response.error(e);
    }
}

module.exports = MoviesHandler;