const Joi = require('joi');
const moment = require('moment');

const reservationSchema = Joi.object({
    date: Joi.date().min(moment().format('YYYY-MM-DD')).required(),
    amount: Joi.number().required(),
    totalSeats: Joi.number().required(),
    theatreId: Joi.number().required(),
    movieId: Joi.number().required(),
    screenId: Joi.number().required(),
    timingId: Joi.number().required(),
    seatsId: Joi.array().required().items(Joi.number().required()).min(1)
});

module.exports = {
    reservationSchema
};