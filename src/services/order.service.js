const httpStatus = require('http-status');
const mongoose = require('mongoose');
const { Order } = require('../models');
const ApiError = require('../utils/ApiError');

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

const getOrderDetailById = async (id) => {
  return Order.findById(id);
};

const updateOrderById = async (orderId, updateBody) => {
  const product = await getOrderDetailById(orderId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'product not found');
  }
  Object.assign(product, updateBody);
  await product.save();
  return product;
};

const deleteOrderById = async (productId) => {
  const product = await getOrderDetailById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'order not found');
  }
  await product.remove();
  return product;
};

module.exports = {
  createOrderProduct,
  queryOrder,
  getListOrderByUserID,
  updateOrderById,
  getOrderDetailById,
  deleteOrderById,
};
