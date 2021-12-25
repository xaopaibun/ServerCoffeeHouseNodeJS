const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { customerFeedbackService } = require('../services');
const pick = require('../utils/pick');

const createCustomeFeedback = catchAsync(async (req, res) => {
  const data = await customerFeedbackService.createCustomerFeedback(req.body);
  res.status(httpStatus.CREATED).send({ message: 'Custome Feedback Successful', data });
});

const getCustomeFeedback = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['product_id']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await customerFeedbackService.queryCustomerFeedback(filter, options);
  res.send(result);
});

module.exports = {
  createCustomeFeedback,
  getCustomeFeedback,
};
