const httpStatus = require('http-status');
const { CustomerFeedback } = require('../models');
const ApiError = require('../utils/ApiError');

const createCustomerFeedback = async (param) => {
  return CustomerFeedback.create(param);
};

const queryCustomerFeedback = async (filter, options) => {
  const data = await CustomerFeedback.paginate(filter, options);
  return data;
};

const getCustomerFeedbackById = async (id) => {
  return CustomerFeedback.findById(id);
};

const updateCustomerFeedbackById = async (Id, updateBody) => {
  const data = await getCustomerFeedbackById(Id);
  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, 'CustomerFeedback not found');
  }
  Object.assign(data, updateBody);
  await data.save();
  return data;
};

const deleteCustomerFeedbackById = async (Id) => {
  const data = await getCustomerFeedbackById(Id);
  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, 'CustomerFeedback not found');
  }
  await data.remove();
  return data;
};

module.exports = {
  createCustomerFeedback,
  queryCustomerFeedback,
  updateCustomerFeedbackById,
  deleteCustomerFeedbackById,
};
