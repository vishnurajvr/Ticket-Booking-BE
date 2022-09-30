const Joi = require('joi');

// Utils
const Response = require('../../utils/response');

const signUpSchema = Joi.object({
    password: Joi.string().required(),
    name: Joi.string().required().min(6).max(50),
    gender: Joi.string().valid('Male', 'Female', 'Other').required(),
    mobileNumber: Joi.string().required().pattern(new RegExp(/^\d{10}$/)),
});

const loginSchema = Joi.object({
    mobileNumber: Joi.string().required().pattern(/^\d{10}$/),
    password: Joi.string(),
    otp: Joi.string().length(6),
}).or('password', 'otp');

const validator = (schema) => async (value) => {
    try {
        if (!Joi.isSchema(schema)) return;
        const result = await schema.validateAsync(value, { abortEarly: true });
        console.log({ result })
        return result;
    } catch (e) {
        return Response.error(e);
    }
}

module.exports = {
    validator,
    loginSchema,
    signUpSchema
};