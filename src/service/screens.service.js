// Models
const { Screens, Reservation, Movies, Theatres } = require('../database/models');

// Helpers
const Response = require('../utils/response');

class ScreensService { }

ScreensService.createScreen = async (payload, userData) => {
    try {

        const findData = await Screens.query().findOne({
            name: payload.name,
            theatreId: payload.theatreId
        });

        if (findData) return Response.error('Screens Name Already Exists. Please choose another screen name');

        const getTheatre = await Theatres.query().findById(payload.theatreId);

        if (!getTheatre) return Response.error('Invalid theatre!');

        let body = {
            name: payload.name,
            userId: userData.id,
            price: payload.price,
            rowsCount: payload.rowsCount,
            theatreId: payload.theatreId,
            isAvailable: payload.isAvailable,
            columnsCount: payload.columnsCount,
            totalSeats: payload.rowsCount * payload.columnsCount,
        };

        if (payload.movieId) {
            const getMovies = await Movies.query().findById(payload.movieId);
            if (!getMovies) return Response.error('Invalid movies selected', 400);
            body.movieId = payload.movieId;
        }
        
        if (payload.description) body.description = payload.description;

        const result = await Screens.query().insert(body);

        return Response.success(result, 'Successfully created');

    } catch (e) {
        console.log(e);
        throw new Error(e.message);
    }
}

ScreensService.updateScreen = async (params, payload) => {
    try {

        const findData = await Screens.query().findOne({ id: params.id });
        if (!findData) return Response.error('Invalid Screen Id');

        if (payload.isClosed) {
            const findReservation = await Reservation.query().where('theatreId', params.id).first();
            if (findReservation) return Response.error('We can\'t disable it. Alreay is Reseversation is there.', 400);
        }

        await Screens.query().where('id', params.id).update(payload);

        return Response.success(null, 'Successfully updated');

    } catch (e) {
        console.log(e);
        throw new Error(e.message);
    }
}

ScreensService.getAllScreen = async (queryData, userData) => {
    try {

        const { page, limit } = queryData || {};

        const offset = +page * +limit;
        const result = await Screens.query().where((builder) => {

            if (!userData.admin) builder.where('isClosed', false);
            if (queryData.search?.toString().trim()) builder.where('name', queryData.search);

            builder.offset(offset);
            builder.limit(limit);
        });

        return Response.success(result, 'Successfully fetched');

    } catch (e) {
        console.log(e);
        throw new Error(e.message);
    }
}

ScreensService.getScreenById = async (params, userData) => {
    try {

        let query = { id: params.id };
        if (!userData.admin) query.isClosed = false;

        const result = await Screens.query().findOne(query);

        if (!result) return Response.success(null, 'Screen not found');

        return Response.success(result, 'Successfully fetched');

    } catch (e) {
        console.log(e);
        throw new Error(e.message);
    }
}

ScreensService.deleteScreen = async (params) => {
    try {

        const findData = await Reservation.query().where('theatreId', params.id);

        if (findData?.length > 0) return Response.error('Alreay reservation is there so we couldn\'t delete it', 400);

        const getTheatre = await Screens.query().findById(params.id).select('id');
        if (!getTheatre) return Response.error('Invalid theatre Id', 404);

        await Screens.query().where('theatreId', params.id).del();
        await Screens.query().findById(params.id).del();

        return Response.success(null, 'Successfully deleted');

    } catch (e) {
        console.log(e);
        throw new Error(e.message);
    }
}

module.exports = ScreensService;