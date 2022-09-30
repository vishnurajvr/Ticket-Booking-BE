// Models
const { Screens, Theatres, Reservation, User } = require('../database/models');

// Helpers
const Response = require('../utils/response');

class TheatreService { }

TheatreService.createTheatre = async (payload, userData) => {
    try {

        const findData = await Theatres.query().findOne({ name: payload.name, userId: userData.id });
        if (findData) return Response.error('Theatre Name Already Exists');

        const result = await Theatres.query().insert({ name: payload.name, userId: userData.id });

        return Response.success(result, 'Successfully created');

    } catch (e) {
        console.log(e);
        throw new Error(e.message);
    }
}


TheatreService.updateTheatre = async (params, payload) => {
    try {

        const findData = await Theatres.query().findOne({ id: params.id });
        if (!findData) return Response.error('Invalid Theatre Id');

        if (payload.isClosed) {
            const findReservation = await Reservation.query().where('theatreId', params.id).first();
            if (findReservation) return Response.error('We can\'t disable it. Alreay is Reseversation is there.', 400);
        }

        await Theatres.query().where('id', params.id).update(payload);

        return Response.success(null, 'Successfully updated');

    } catch (e) {
        console.log(e);
        throw new Error(e.message);
    }
}

TheatreService.getAllTheatre = async (queryData, userData) => {
    try {

        const { page, limit } = queryData || {};

        const offset = +page * +limit;
        const result = await Theatres.query().where((builder) => {

            if (!userData.admin) builder.where('isClosed', false);
            if (queryData.search?.toString().trim()) builder.where('name', queryData.search);

            builder.offset(offset);
            builder.limit(limit);
        }).withGraphFetched('screen');

        return Response.success(result, 'Successfully fetched');

    } catch (e) {
        console.log(e);
        throw new Error(e.message);
    }
}

TheatreService.getTheatreById = async (params, userData) => {
    try {

        let query = { id: params.id };
        if (!userData.admin) query.isClosed = false;

        const result = await Theatres.query().findOne(query).withGraphFetched('screen');

        if (!result) return Response.success(null, 'Theatre not found');

        return Response.success(result, 'Successfully fetched');

    } catch (e) {
        console.log(e);
        throw new Error(e.message);
    }
}

TheatreService.deleteTheatre = async (params) => {
    try {

        const findData = await Reservation.query().where('theatreId', params.id);

        if (findData?.length > 0) return Response.error('Alreay reservation is there so we couldn\'t delete it', 400);

        const getTheatre = await Theatres.query().findById(params.id).select('id');
        if (!getTheatre) return Response.error('Invalid theatre Id', 404);

        await Screens.query().where('theatreId', params.id).del();
        await Theatres.query().findById(params.id).del();

        return Response.success(null, 'Successfully deleted');

    } catch (e) {
        console.log(e);
        throw new Error(e.message);
    }
}

module.exports = TheatreService;