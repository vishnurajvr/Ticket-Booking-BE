const Joi = require('joi');

const pageSchema = Joi.object({
    page: Joi.number().required().min(1).default(1),
    limit: Joi.number().min(1).default(10)
});

const paramsIdSchema = Joi.object({
    id: Joi.number().required()
});

module.exports = {
    pageSchema,
    paramsIdSchema
};