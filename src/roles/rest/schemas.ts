import * as Joi from "@hapi/joi";

export default {
  patch: Joi.object().keys({
    isActive: Joi.boolean().required(),
  }),
  post: Joi.object().keys({
    name: Joi.string().required(),
  }),
  put: Joi.object().keys({
    name: Joi.string().required(),
  }),
};
