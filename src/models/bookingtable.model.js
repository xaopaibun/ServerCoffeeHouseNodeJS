const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const bookingtableSchema = mongoose.Schema(
  {
    full_name: {
      type: String,
      required: true,
      trim: true,
    },
    phone_number: {
      type: String,
      required: true,
      minLength: 10,
      maxLength: 10,
      trim: true,
    },
    date_booking: {
      type: String,
      required: true,
      trim: true,
    },
    hour_booking: {
      type: String,
      required: true,
      trim: true,
    },
    status_booking: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Cancel', 'Done', 'Out Of Date'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
bookingtableSchema.plugin(toJSON);
bookingtableSchema.plugin(paginate);

const BookingTable = mongoose.model('BookingTable', bookingtableSchema);

(async (status, start, end) => {
  const data = await BookingTable.find({
    status_booking: status,
    createdAt: { $gte: start, $lt: end },
  });
  return data;
  // eslint-disable-next-line no-console
})('Pending', '2021-12-25', '2021-12-26');

module.exports = BookingTable;
