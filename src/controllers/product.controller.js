const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { productService } = require('../services');

const createProduct = catchAsync(async (req, res) => {
  const data = await productService.createProduct({ ...req.body, image: req.file });
  res.status(httpStatus.CREATED).send({ message: 'add successful products', data });
});

const getProducts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['category_id']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await productService.queryProduct(filter, options);
  res.send(result);
});

const getProduct = catchAsync(async (req, res) => {
  const product = await productService.getProductById(req.params.productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  res.send(product);
});

const updateProduct = catchAsync(async (req, res) => {
  const data = await productService.updateProductById(req.params.productId, req.body);
  res.send({ message: 'update successful products', data });
});

const deleteProduct = catchAsync(async (req, res) => {
  const data = await productService.deleteProductById(req.params.productId);
  res.status(httpStatus.NO_CONTENT).send({ message: 'delete successful products', data });
});

module.exports = {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};
