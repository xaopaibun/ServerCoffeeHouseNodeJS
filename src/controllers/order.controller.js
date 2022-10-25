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

const updateOrder = catchAsync(async (req, res) => {
  const data = await orderService.updateOrderById(req.params.orderId, req.body);
  res.send({ message: 'update successfull order', data });
});

const getOrderDetail = catchAsync(async (req, res) => {
  const data = await orderService.getOrderDetailById(req.params.orderId);
  res.send({ message: 'get order detail successfull', data });
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

const deleteOrderByID = catchAsync(async (req, res) => {
  const data = await orderService.deleteOrderById(req.params.orderId);
  res.status(httpStatus.NO_CONTENT).send({ message: 'delete successful order', data });
});

module.exports = {
  createOrderProduct,
  getOrderProduct,
  getStatistic,
  updateOrder,
  getOrderDetail,
  deleteOrderByID,
};
