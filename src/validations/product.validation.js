const Joi = require('joi');

const createProduct = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    category_id: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
    image: Joi.object().required(),
    slug: Joi.string()
      // eslint-disable-next-line security/detect-unsafe-regex
      .regex(/^[a-z](-?[a-z])*$/)
      .required(),
    price: Joi.number().min(0).required(),
    star: Joi.number().min(0).max(5).required(),
    stock: Joi.number().min(0).required(),
    information: Joi.string().required(),
    content: Joi.string().required(),
    shipping: Joi.boolean().required(),
  }),
};

module.exports = {
  createProduct,
};
