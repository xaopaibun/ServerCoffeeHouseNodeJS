const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { orderService } = require('../services');

const createOrderProduct = catchAsync(async (req, res) => {
  const data = await orderService.createOrderProduct(req.body);
  res.status(httpStatus.CREATED).send({ message: 'order successfull', data });
});

const getOrderProduct = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['id']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await orderService.queryOrder(filter, options);
  res.send(result);
});

const getStatistic = catchAsync(async (req, res) => {
  const result = {
    confirm: 10,
    delivery: 12,
    success: 15,
    cancel: 12,
  };
  res.send(result);
});

module.exports = {
  createOrderProduct,
  getOrderProduct,
  getStatistic,
};
