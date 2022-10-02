const Joi = require('joi');

const screenSchema = Joi.object({
    movieId: Joi.number(),
    theatreId: Joi.number().required(),
    description: Joi.string().max(1000),
    isAvailable: Joi.boolean().default(true),
    name: Joi.string().required().min(3).max(100),
    totalSeats: Joi.number().required().greater(40),
    rowCount: Joi.number().min(5).max(50).required(),
    columnCount: Joi.number().min(5).max(50).required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required().min(Joi.ref('startDate')),
    timingsData: Joi.array().min(1).required().items(Joi.object({
        timing: Joi.string().required()
    })),
    sections: Joi.array().min(1).required().items(Joi.object({
        name: Joi.string().required(),
        amount: Joi.number().required(),
        rowCount: Joi.number().required(),
        columnCount: Joi.number().required(),
        totalSeats: Joi.number().required(),
        rowsData: Joi.array().min(1).required().items(Joi.object({
            seatsRowName: Joi.string().required(),
            seats: Joi.array().min(1).items(Joi.object({
                name: Joi.string().allow(null, ''),
                status: Joi.string().valid('available', 'unavailable', 'hidden')
            })).required()
        })).required()
    }))
});

module.exports = {
    screenSchema,
};