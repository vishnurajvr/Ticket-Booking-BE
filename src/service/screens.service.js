const moment = require("moment");

// Models
const { Screens, Reservation, Movies, Theatres, Shows, Sections, Seats } = require('../database/models');

// Helpers
const Response = require('../utils/response');
const pageMeta = require('../helper/pageMeta');
const messages = require('../constants/messages');
const { createSection, createTimings, handleShows } = require('../utils/screenUtills');

class ScreensService { }

ScreensService.createScreen = async (payload) => {

    const transaction = await Screens.startTransaction();

    try {

        const findData = await Screens.query().findOne({
            name: payload.name,
            theatreId: payload.theatreId
        });

        if (findData) return Response.error(messages.createScreenError1, 400);

        const getTheatre = await Theatres.query().findById(payload.theatreId);

        if (!getTheatre) return Response.error(messages.invalidTheatre, 400);

        let body = {
            name: payload.name,
            isAvailable: false,
            rowCount: payload.rowCount,
            theatreId: payload.theatreId,
            columnCount: payload.columnCount,
            endDate: payload.endDate,
            startDate: payload.startDate,
            totalSeats: payload.totalSeats,
        };

        if (payload.description) body.description = payload.description;

        if (payload.movieId) {

            if (payload.timingsData?.length) body.isAvailable = payload.isAvailable;

            const getMovies = await Movies.query().findOne({ id: payload.movieId, })

            if (!getMovies) return Response.error(messages.invalidMoviesSelected, 400);
            if (moment(payload.startDate) < moment(getMovies.releaseDate)) return Response.error(messages.invalidReleasedDate, 400);

            body.movieId = payload.movieId;

            Shows.query().findOne({ movieId: payload.movieId }).then((data) => {
                if (!data) Shows.query(transaction).insert({ movieId: payload.movieId }).then(() => {
                    console.log('*'.repeat(20), ' SHOWs CREATED ', '*'.repeat(20));
                });
            });
        }

        const result = await Screens.query(transaction).insert(body);

        await createSection({ data: payload.sections, screenId: result.id, transaction, body });

        console.log({ payload })
        if (payload.timingsData?.length) {
            console.log('='.repeat(200));
            await createTimings({ screenId: result.id, data: payload.timingsData, transaction, movieId: payload.movieId });
        }

        await transaction.commit();

        return Response.success(result, messages.successfullyCreated);

    } catch (e) {
        await transaction.rollback();
        return Response.error(e);
    }
}

ScreensService.updateScreen = async ({ id }, payload) => {

    const transaction = await Screens.startTransaction();

    try {

        const findScreen = await Screens.query().findById(id);
        if (!findScreen) return Response.error(messages.invalidScreenId, 400);

        const getTheatre = await Theatres.query().findById(payload.theatreId);
        if (!getTheatre) return Response.error(messages.invalidTheatre, 400);

        const findData = await Screens.query().findOne({
            name: payload.name,
            theatreId: payload.theatreId
        }).whereNot('id', id);
        if (findData) return Response.error(messages.createScreenError1, 400);


        let body = {
            name: payload.name,
            isAvailable: false,
            endDate: payload.endDate,
            startDate: payload.startDate,
        };

        if (payload.description) body.description = payload.description;

        if (payload.movieId) {

            body.isAvailable = payload.isAvailable;

            if (!body.isAvailable) {
                const getReservation = await Reservation.query().where('screenId', id).where('date', '>=', moment().format('YYYY-MM-DD'));
                if (getReservation?.length) return Response.error(messages.updateScreenError1, 400);
            }

            const getMovies = await Movies.query().findOne({ id: payload.movieId, });

            if (!getMovies) return Response.error(messages.invalidMoviesSelected, 400);
            if (moment(payload.startDate) < moment(getMovies.releaseDate)) return Response.error(messages.invalidReleasedDate, 400);

            body.movieId = payload.movieId;

            await handleShows({ findScreen, transaction, movieId: payload.movieId, screenId: id });
        }

        await Screens.query(transaction).findById(id).update(body);

        if (payload.timingsData?.length) {
            await createTimings({ screenId: id, data: payload.timingsData, transaction, movieId: payload.movieId, isDelete: true });
        }

        await transaction.commit();

        return Response.success(null, messages.successfullyUpdated);

    } catch (e) {
        await transaction.rollback();
        return Response.error(e);
    }
}

ScreensService.getAllScreen = async (queryData, userData = {}) => {
    try {

        const { page, limit } = queryData || {};

        console.log({ userData, limit, page })

        const { total, results } = await Screens.query().where((builder) => {

            if (!userData.admin) builder.where('isAvailable', true);
            if (queryData.search?.toString().trim()) builder.where('name', queryData.search);

        }).page(page - 1, limit).withGraphFetched({
            movie: true,
            timing: true,
        });

        return Response.success(pageMeta(total, limit, results), messages.successfullyFetch);

    } catch (e) {
        console.log(e);
        throw new Error(e.message);
    }
}

ScreensService.getScreenById = async (params, userData = {}) => {
    try {

        let query = { id: params.id };
        if (!userData.admin) query.isAvailable = true;

        const result = await Screens.query().findOne(query).withGraphFetched({ movie: true, timing: true });

        if (!result) return Response.success(null, messages.invalidScreenId);

        return Response.success(result, messages.successfullyFetch);

    } catch (e) {
        console.log(e);
        throw new Error(e.message);
    }
}

ScreensService.deleteScreen = async (params) => {
    try {

        const findData = await Reservation.query().where('screenId', params.id);

        if (findData?.length > 0) return Response.error('Alreay reservation is there so we couldn\'t delete it', 400);

        const getScreen = await Screens.query().findById(params.id).select('id');
        if (!getScreen) return Response.error(messages.invalidScreenId, 404);

        await Sections.query().where('screenId', params.id).del();
        await Screens.query().findById(params.id).del();

        return Response.success(null, messages.successfullyDeleted);

    } catch (e) {
        console.log(e);
        throw new Error(e.message);
    }
}

module.exports = ScreensService;

/*

Refer: screens.json

Class-A (41)
- - 1 1 1 - 1 1 - -
1 1 1 1 1 - 1 1 1 1
1 1 1 1 1 - 1 1 1 1
1 1 1 1 1 - 1 1 1 1
1 1 1 1 1 - 1 1 1 1
- - - - - - - - - -
Class-B (38)
- - - - - - - - 1 1
1 1 1 1 1 - 1 1 1 1
1 1 1 1 1 - 1 1 1 1
1 1 1 1 1 - 1 1 1 1
1 1 1 1 1 - 1 1 1 1

   -------------
   |S C R E E N|
   -------------

*/