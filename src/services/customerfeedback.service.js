const { CustomerFeedback } = require('../models');

const createCustomerFeedback = async (param) => {
  return CustomerFeedback.create(param);
};

const queryCustomerFeedback = async (filter, options) => {
  const data = await CustomerFeedback.paginate(filter, options);
  return data;
};

module.exports = {
  createCustomerFeedback,
  queryCustomerFeedback,
};
