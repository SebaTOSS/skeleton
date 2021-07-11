import Joi = require('joi');

export default {
    post: Joi.object().keys({
        name: Joi.string().required(),
        isActive: Joi.boolean().required(),
    }),
    put: Joi.object().keys({
        name: Joi.string().required(),
        isActive: Joi.boolean().required(),
    }),
    patch: Joi.object().keys({
        isActive: Joi.boolean().required(),
    }),
};
