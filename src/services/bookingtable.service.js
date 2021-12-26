const httpStatus = require('http-status');
const { BookingTable } = require('../models');

const ApiError = require('../utils/ApiError');

const createBookingTable = async (body) => {
  return BookingTable.create(body);
};

const getBookingTableById = async (id) => {
  return BookingTable.findById(id);
};

const queryBookingTable = async (filter, options) => {
  const data = await BookingTable.paginate(filter, options);
  return data;
};

const deleteBookingTableById = async (Id) => {
  const data = await getBookingTableById(Id);
  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  await data.remove();
  return data;
};

module.exports = {
  createBookingTable,
  queryBookingTable,
  deleteBookingTableById,
};
