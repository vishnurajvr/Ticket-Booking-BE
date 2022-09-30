const moment = require('moment');
const { Reservation } = require('../database/models');

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

module.exports = {
    getReservation
};