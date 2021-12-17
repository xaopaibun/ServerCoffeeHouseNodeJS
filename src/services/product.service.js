const httpStatus = require('http-status');
const { Product } = require('../models');
const ApiError = require('../utils/ApiError');

const createProduct = async (ProductBody) => {
  if (await Product.isEmailTaken(ProductBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return Product.create(ProductBody);
};

const queryProduct = async (filter, options) => {
  const product = await Product.paginate(filter, options);
  return product;
};

const getProductById = async (id) => {
  return Product.findById(id);
};

const updateProductById = async (productId, updateBody) => {
  const product = await getProductById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'product not found');
  }
  Object.assign(product, updateBody);
  await product.save();
  return product;
};

const deleteProductById = async (productId) => {
  const product = await getProductById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'product not found');
  }
  await product.remove();
  return product;
};

module.exports = {
  createProduct,
  queryProduct,
  getProductById,
  updateProductById,
  deleteProductById,
};
