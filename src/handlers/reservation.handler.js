// Helpers
const Response = require('../utils/response');
const commonSchma = require('../validation/schema/common.schema');
const ReservationService = require('../service/Reservation.service');
const { reservationSchema } = require('../validation/schema/reservation.schema');

class ReservationHandler { }

ReservationHandler.createReservation = async (req, res) => {
    try {

        let payload = req.payload;
        const userData = req.auth.credentials;
        await reservationSchema.validateAsync(payload);

        const result = await ReservationService.createReservation(payload, userData);
        return res.response(result).code(result.status);

    } catch (e) {
        return Response.error(e);
    }
}


ReservationHandler.getAllReservation = async (req, res) => {
    try {

        let userData = req.auth.credentials;

        const result = await ReservationService.getAllReservation(userData);
        return res.response(result).code(result.status);

    } catch (e) {
        console.log({ e })
        return Response.error(e);
    }
}

ReservationHandler.getReservationById = async (req, res) => {
    try {

        let params = req.params;
        let userData = req.auth.credentials;

        await commonSchma.paramsIdSchema.validateAsync(params);

        const result = await ReservationService.getReservationById(params, userData);
        return res.response(result).code(result.status);

    } catch (e) {
        console.log({ e })
        return Response.error(e);
    }
}

module.exports = ReservationHandler;