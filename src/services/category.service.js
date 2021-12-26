const httpStatus = require('http-status');
const { Category } = require('../models');
const ApiError = require('../utils/ApiError');

const createCategory = async (CategoryBody) => {
  return Category.create(CategoryBody);
};

const queryCategory = async (filter, options) => {
  const data = await Category.paginate(filter, options);
  return data;
};

const getCategoryById = async (id) => {
  return Category.findById(id);
};

const updateCategoryById = async (categoryId, updateBody) => {
  const category = await getCategoryById(categoryId);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  Object.assign(category, updateBody);
  await category.save();
  return category;
};

const deleteCategoryById = async (categoryId) => {
  const category = await getCategoryById(categoryId);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  await category.remove();
  return category;
};

module.exports = {
  createCategory,
  queryCategory,
  updateCategoryById,
  deleteCategoryById,
};
