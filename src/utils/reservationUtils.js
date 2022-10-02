const moment = require('moment');

// Models
const { Reservation, Movies, Theatres, Screens, Seats } = require('../database/models');

// helper
const messages = require('../constants/messages');

const getReservation = async ({ screenId, theatreId, timingId, date }) => {
    let query = {};

    if (screenId) query.screenId = screenId;
    if (timingId) query.timingId = timingId;
    if (theatreId) query.theatreId = theatreId;

    const result = await Reservation.query().where((builder) => {
        if (screenId) builder.where('screenId', screenId);
        if (timingId) builder.where('timingId', timingId);
        if (theatreId) builder.where('theatreId', theatreId);
        if (date) builder.where('date', '>=', new Date(moment(date).format('YYYY-MM-DD')));
    });

    return result;
}

const validateReservation = async ({ movieId, theatreId, screenId, timingId, date, seatsId, amount, totalSeats }) => {

    const findMovie = await Movies.query().findById(movieId).select('id');
    if (!findMovie) throw new Error(messages.invalidMovie);

    const findTheatre = await Theatres.query().findById(theatreId)
        .where('isOpened', true)
        .withGraphJoined('screen')
        .where('screen.id', screenId);

    if (!findTheatre) throw new Error(messages.invalidTheatre);

    const findScreen = await Screens.query().findById(screenId).where('isAvailable', true).withGraphJoined({
        timing: true,
        movie: true
    }).where('movie.id', movieId);

    if (!findScreen) throw new Error(messages.invalidScreenId);

    if (seatsId?.length !== totalSeats) throw new Error(messages.createReservationError, 400);

    const getTimingId = findScreen?.timing?.find?.(item => String(item.id) === String(timingId));

    if (!findScreen.timing || findScreen.timing?.length <= 0 || !getTimingId) throw new Error(messages.invalidTiming);

    if (moment(findScreen.startDate) <= moment(date) <= moment(findScreen.endDate)) {

        const seatsQuery = Seats.query()
            .withGraphJoined({
                section: {
                    screen: {
                        movie: true,
                        theatre: true
                    }
                },
                reservationSeat: {
                    reservation: true
                }
            });

        const getSeats = await seatsQuery.clone()
            .where(builder => {
                builder.where('status', 'available');
                builder.whereIn('Seats.id', [...seatsId]);
                builder.where('reservationSeat:reservation.date', date);
                builder.where('section:screen.id', screenId);
                builder.where('section:screen:movie.id', movieId);
                builder.where('section:screen:theatre.id', theatreId);
            });

        // Check booked sheets
        if (getSeats?.length > 0) {
            let ids = getSeats.map(x => x?.id).join(',');
            throw new Error(`This seats are already booked (${ids}), Please try book to available seats`);
        }

        const getSeatsPrice = await seatsQuery.clone()
            .where(builder => {
                builder.whereIn('Seats.id', [...seatsId]);
                builder.where('section:screen.id', screenId);
                builder.where('section:screen:movie.id', movieId);
                builder.where('section:screen:theatre.id', theatreId);
            });

        if (seatsId.length !== getSeatsPrice?.length) throw new Error(messages.invalidSeats, 400);

        // Hidden and Unavailable seats
        if (getSeatsPrice?.find(x => x.status !== 'available')) throw new Error('Invalid seats');

        // Price
        let totalAmount = getSeatsPrice.reduce((value, accum) => {
            return value + accum.section.amount;
        }, 0);

        if (totalAmount !== amount) throw new Error(messages.invalidPrice);

        return getSeatsPrice;

    } else {
        throw new Error(messages.invalidDateSelected);
    }

}

module.exports = {
    getReservation,
    validateReservation
};