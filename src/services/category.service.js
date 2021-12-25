const { Category } = require('../models');

const createCategory = async (CategoryBody) => {
  return Category.create(CategoryBody);
};

const queryCategory = async (filter, options) => {
  const data = await Category.paginate(filter, options);
  return data;
};

module.exports = {
  createCategory,
  queryCategory,
};
