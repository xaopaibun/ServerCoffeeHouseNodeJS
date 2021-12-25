const httpStatus = require('http-status');
const { Product } = require('../models');
const ApiError = require('../utils/ApiError');
const UploadImages = require('../utils/uploadImage');

const createProduct = async (ProductBody) => {
  const image = UploadImages(ProductBody.image);
  return Product.create({ ...ProductBody, image });
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
