const moment = require('moment');

// Models
const { Movies, Reservation, Screens } = require('../database/models');

// Helpers
const Response = require('../utils/response');
const pageMeta = require("../helper/pageMeta");
const messages = require('../constants/messages');

class MovieService { }

MovieService.getAllMovies = async (query) => {
    try {

        const { page, limit } = query || {};

        const { results, total } = await Movies.query().page(page - 1, limit);

        return Response.success(pageMeta(total, limit, results), messages.successfullyFetch);
    } catch (e) {
        console.log(e);
        throw new Error(e.message);
    }
}

MovieService.getMoviesById = async (params) => {
    try {

        const result = await Movies.query().findById(params.id);

        if (!result) return Response.error(messages.invalidMovie, 404);

        return Response.success(result, messages.successfullyFetch);
    } catch (e) {
        console.log(e);
        throw new Error(e.message);
    }
}

MovieService.createMovie = async (payload) => {
    try {

        const findDuplicateNames = await Movies.query().findOne({ name: payload.name });

        if (findDuplicateNames) return Response.error(messages.alreadyExistsMovie, 400);

        const result = await Movies.query().insert(payload);

        return Response.success(result, messages.successfullyCreated);
    } catch (e) {
        console.log(e);
        throw new Error(e.message);
    }
}

MovieService.updateMovie = async (params, payload) => {
    try {

        const FORMAT = 'YYYY-MM-DD';
        const findMovie = await Movies.query().findById(params.id);
        if (!findMovie) return Response.error(messages.invalidMovie, 404);

        const findDuplicateNames = await Movies.query().findOne({ name: payload.name }).whereNot('id', params.id);
        if (findDuplicateNames) return Response.error(messages.alreadyExistsMovie, 400);

        if (moment(findMovie.releaseDate).format(FORMAT) !== moment(payload.releaseDate).format(FORMAT)) {
            const getReservation = await Reservation.query().findOne({
                movieId: findMovie.id,
                date: moment(findMovie.releaseDate)
            });

            if (getReservation) return Response.error(messages.updateMovieError1, 400);
        }

        await Movies.query().findById(params.id).update(payload);

        return Response.success(null, messages.successfullyUpdated);
    } catch (e) {
        console.log(e);
        throw new Error(e.message);
    }
}

MovieService.deleteMovie = async (params) => {
    try {

        const findMovie = await Movies.query().findById(params.id);
        if (!findMovie) return Response.error(messages.invalidMovie, 404);

        const getScreens = await Screens.query().findOne({ movieId: findMovie.id });
        if (getScreens) return Response.error(messages.deleteMovieError2, 400);

        const getReservation = await Reservation.query().findOne({ movieId: findMovie.id });
        if (getReservation) return Response.error(messages.deleteMovieError1, 400);

        await Movies.query().findById(params.id).del();

        return Response.success(null, messages.successfullyDeleted);
    } catch (e) {
        console.log(e);
        throw new Error(e.message);
    }
}

module.exports = MovieService;