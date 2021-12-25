const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { categoryService } = require('../services');
const pick = require('../utils/pick');

const createCategory = catchAsync(async (req, res) => {
  const categoryProduct = await categoryService.createCategory(req.body);
  res.status(httpStatus.CREATED).send(categoryProduct);
});

const getCategory = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['product_id']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await categoryService.queryCategory(filter, options);
  res.send(result);
});

module.exports = {
  createCategory,
  getCategory,
};
