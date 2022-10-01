const Joi = require('joi');

const createTheatre = Joi.object({
    isOpened: Joi.boolean().default(false),
    name: Joi.string().required().min(3).max(100)
});

const updateTheatre = Joi.object({
    isOpened: Joi.boolean().default(false),
    name: Joi.string(),
});

const theatreParams = Joi.object({
    id: Joi.number().required()
});

const theatreQuery = Joi.object({
    search: Joi.string(),
    limit: Joi.number().default(10),
    page: Joi.number().required().default(1),
});

module.exports = {
    theatreQuery,
    theatreParams,
    createTheatre,
    updateTheatre,
};