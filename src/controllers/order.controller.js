const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { orderService } = require('../services');
const { Order } = require('../models');

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

const getOrderProductbyIdUser = catchAsync(async (req, res) => {
  const result = await orderService.getListOrderByUserID(req.params.userId);
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
  const pending = await Order.aggregate([{ $match: { status: 1 } }]);
  const delivery = await Order.aggregate([{ $match: { status: 2 } }]);
  const success = await Order.aggregate([{ $match: { status: 3 } }]);
  const cancel = await Order.aggregate([{ $match: { status: 4 } }]);

  const result = {
    confirm: pending.length,
    delivery: delivery.length,
    success: success.length,
    cancel: cancel.length,
  };
  res.send(result);
});

const deleteOrderByID = catchAsync(async (req, res) => {
  const data = await orderService.deleteOrderById(req.params.orderId);
  res.status(httpStatus.NO_CONTENT).send({ message: 'delete successful order', data });
});

const getStatisticbyYear = catchAsync(async (req, res) => {
  const { year } = req.params;
  const result = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= 12; i++) {
    // eslint-disable-next-line no-await-in-loop
    const data = await Order.find({ date: { $gte: new Date('2023'), $lt: new Date(year, i + 1, '01') } });
    console.log(data);
    result.push({
      id: i,
      month: `Tháng ${i}`,
      total: 300000,
    });
  }

  res.send(result);
});
module.exports = {
  createOrderProduct,
  getOrderProduct,
  getStatistic,
  updateOrder,
  getOrderDetail,
  deleteOrderByID,
  getStatisticbyYear,
  getOrderProductbyIdUser,
};
