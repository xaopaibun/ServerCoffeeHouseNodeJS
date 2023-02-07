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
  const success = await Order.aggregate([{ $match: { status: 4 } }]);
  const cancel = await Order.aggregate([{ $match: { status: 3 } }]);

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

  // eslint-disable-next-line camelcase
  const statistic_month = await Order.aggregate([
    {
      $match: {
        status: 4,
        payment: 2,
        date: {
          $gte: new Date(`${year}-01-01`),
          $lt: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: {
          year: { $year: '$date' },
          month: { $month: '$date' },
        },
        total_revenue: { $sum: '$total_money' },
      },
    },
    {
      $sort: { '_id.year': 1, '_id.month': 1 },
    },
  ]);

  // eslint-disable-next-line camelcase
  const statistic_year = await Order.aggregate([
    {
      $match: {
        status: 4,
        payment: 2,
      },
    },
    {
      $group: {
        _id: {
          year: { $year: '$date' },
        },
        total_revenue: { $sum: '$total_money' },
      },
    },
    {
      $sort: { '_id.year': 1, '_id.month': 1 },
    },
  ]);
  // eslint-disable-next-line camelcase
  const statistic_product = await Order.aggregate([
    {
      $match: { status: 4, payment: 2 },
    },
    {
      $unwind: '$list_product',
    },
    {
      $group: {
        _id: '$list_product.name',
        totalQuantity: { $sum: '$list_product.quantity' },
      },
    },
    {
      $sort: { totalQuantity: -1 },
    },
    {
      $limit: 5,
    },
  ]);
  res.send({ statistic_month, statistic_year, statistic_product });
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
