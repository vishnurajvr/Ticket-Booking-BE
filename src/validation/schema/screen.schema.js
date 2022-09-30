const Joi = require('joi');

const screenSchema = Joi.object({
    movieId: Joi.number(),
    description: Joi.string().max(100),
    timingId: Joi.number().required(),
    theatreId: Joi.number().required(),
    isAvailable: Joi.boolean().default(true),
    name: Joi.string().required().min(3).max(100),
    totalSeats: Joi.number().required().greater(40),
    price: Joi.number().required().min(50).max(500),
    rowsCount: Joi.number().min(5).max(50).required(),
    columnsCount: Joi.number().min(5).max(50).required(),
});

module.exports = {
    screenSchema,
};