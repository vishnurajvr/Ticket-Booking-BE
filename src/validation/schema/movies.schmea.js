const Joi = require('joi');

const createMovieSchema = Joi.object({
    name: Joi.string().required().max(255),
    duration: Joi.number().required().min(1).max(500),
    description: Joi.string().max(1000),
    languages: Joi.array(),
    releaseDate: Joi.date().required()
});

module.exports = {
    createMovieSchema
};