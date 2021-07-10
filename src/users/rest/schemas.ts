import * as Joi from '@hapi/joi';
import * as Extensions from '@hapi/joi-date';
const JoiForDates = Joi.extend(Extensions);

export default {
    patch: Joi.object().keys({
        isActive: Joi.boolean().required(),
    }),
    post: Joi.object().keys({
        firstName: Joi.string().allow(null, '').required(),
        lastName: Joi.string().allow(null, '').required(),
        email: Joi.string().email().allow(null),
        loginToken: Joi.string().allow(null, '').required(),
        birthday: JoiForDates.date().format('YYYY-MM-DD').allow(null),
        language: Joi.string().allow(null, ''),
        pictureUrl: Joi.string().allow(null, ''),
        mobile: Joi.string().allow(null, ''),
        extraAttributes: Joi.object().allow(null),
        phone: Joi.string().allow(null, ''),
    }),
    put: Joi.object().keys({
        firstName: Joi.string().allow(null, '').required(),
        lastName: Joi.string().allow(null, '').required(),
        loginToken: Joi.string().allow(null, '').required(),
        email: Joi.string().email().allow(null),
        birthday: JoiForDates.date().format('YYYY-MM-DD').allow(null),
        language: Joi.string().allow(null, ''),
        pictureUrl: Joi.string().allow(null, ''),
        mobile: Joi.string().allow(null, ''),
        extraAttributes: Joi.object().allow(null),
        phone: Joi.string().allow(null, ''),
    }),
};
