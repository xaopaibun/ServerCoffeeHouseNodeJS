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

module.exports = BookingTable;
