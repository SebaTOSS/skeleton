import Joi = require('@hapi/joi');

export default {
    post: Joi.object().keys({
        entity: Joi.string().required(),
        links: Joi.array().items(Joi.string()).required()
    }),
    delete: Joi.object().keys({
        entity: Joi.string().required(),
    }),
};
