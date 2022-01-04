const mongoose = require('mongoose');
const { Order } = require('../models');

const createOrderProduct = async (body) => {
  return Order.create(body);
};

const queryOrder = async (filter, options) => {
  const data = await Order.paginate(filter, options);
  return data;
};

const getListOrderByUserID = async (userId) => {
  const data = await Order.aggregate([{ $match: { user_id: mongoose.Types.ObjectId(userId) } }]);
  return data;
};

module.exports = {
  createOrderProduct,
  queryOrder,
  getListOrderByUserID,
};
