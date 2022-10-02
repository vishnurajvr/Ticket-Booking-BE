// Models
const { Reservation, ReservationSeats } = require('../database/models');

// Helpers
const Response = require('../utils/response');
const messages = require('../constants/messages');
const { validateReservation } = require('../utils/reservationUtils');

class ReservationService { }

ReservationService.createReservation = async (payload, userData) => {

    const transaction = await Reservation.startTransaction();

    try {

        const getSeats = await validateReservation(payload);

        const result = await Reservation.query(transaction).insert({
            date: payload.date,
            userId: userData.id,
            amount: payload.amount,
            theatreId: payload.theatreId,
            movieId: payload.movieId,
            screenId: payload.screenId,
            timingId: payload.timingId,
            totalSeats: payload.totalSeats
        });

        let reservationSeatsData = [];
        for (let item of payload.seatsId) {

            const findData = getSeats.find(x => String(x.id) === String(item));

            reservationSeatsData.push({
                seatsId: item,
                userId: userData.id,
                reservationId: result.id,
                displayName: findData?.seatsRowName + findData?.name
            });
        }

        await ReservationSeats.knex().batchInsert('ReservationSeats', reservationSeatsData).transacting(transaction);

        await transaction.commit();

        return Response.success(result, messages.successfullyCreated);
    } catch (e) {
        console.log(e);
        await transaction.rollback();
        throw new Error(e.message);
    }
}

ReservationService.getAllReservation = async (userData) => {
    try {

        const result = await Reservation.query().where(builer => {
            if (!userData.admin) builer.where('userId', userData.id);
        }).withGraphFetched({
            movie: true,
            theatre: true,
            timing: true,
            screen: true,
            reservationSeat: true
        });

        return Response.success(result, messages.successfullyFetch);
    } catch (e) {
        console.log(e);
        throw new Error(e.message);
    }
}

ReservationService.getReservationById = async ({ id }, userData) => {
    try {

        const result = await Reservation.query().where(builer => {
            builer.where('id', id);
            if (!userData.admin) builer.where('userId', userData.id);
        }).withGraphFetched({
            movie: true,
            theatre: true,
            timing: true,
            screen: true,
            reservationSeat: true
        });

        if (!result) return Response.error(messages.recordNotFound, 400);

        return Response.success(result, messages.successfullyFetch);
    } catch (e) {
        console.log(e);
        throw new Error(e.message);
    }
}

module.exports = ReservationService;