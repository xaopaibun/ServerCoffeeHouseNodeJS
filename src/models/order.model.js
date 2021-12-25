const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const productSchema = mongoose.Schema({
  name: String,
  image: String,
  price: Number,
  quatity: Number,
  into_money: { type: Number },
});
const orderSchema = mongoose.Schema(
  {
    full_name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phone_number: {
      type: String,
      required: true,
      trim: true,
    },
    total_money: {
      type: Number,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    note: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Cancel', 'Done'],
      default: 'Pending',
    },
    list_product: {
      type: [productSchema],
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
orderSchema.plugin(toJSON);
orderSchema.plugin(paginate);

const Order = mongoose.model('Order', orderSchema);

// eslint-disable-next-line no-console
console.log(
  new Order({
    full_name: 'Phạm Văn Quý',
    address: 'Hà Nội',
    email: 'vanquy33338888@gmail.com',
    phone_number: '0352343938',
    list_product: [
      {
        name: 'abc',
        quatity: 2,
        price: 5000,
        into_money: 10000,
      },
      {
        name: 'abc',
        quatity: 3,
        price: 5000,
        into_money: 15000,
      },
    ],
  })
); // []

module.exports = Order;
