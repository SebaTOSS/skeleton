import * as Joi from "@hapi/joi";

export default {
  patch: Joi.object().keys({
    isActive: Joi.boolean().required(),
  }),
  post: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().allow(null),
  }),
  put: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().allow(null),
  }),
};
