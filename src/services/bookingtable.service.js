const { BookingTable } = require('../models');

const createBookingTable = async (body) => {
  return BookingTable.create(body);
};

const queryBookingTable = async (filter, options) => {
  const data = await BookingTable.paginate(filter, options);
  return data;
};

module.exports = {
  createBookingTable,
  queryBookingTable,
};
