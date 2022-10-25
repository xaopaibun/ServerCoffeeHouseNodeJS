const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const productSchema = mongoose.Schema({
  id: mongoose.SchemaTypes.ObjectId,
  name: String,
  image: String,
  price: Number,
  quantity: Number,
});
const orderSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    },
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
      type: Object,
      required: true,
      trim: true,
    },
    note: {
      type: String,
      trim: true,
    },
    status: {
      type: Number,
      enum: [1, 2, 3, 4], // ['Pending', 'Confirmed', 'Cancel', 'Done'],
      default: 1,
    },
    payment: {
      type: Number,
      enum: [1, 2], //      enum: ['Unpaid', 'paid'],
      default: 1,
    },
    shipping_information: {
      type: Number,
      enum: [1, 2, 3, 4], // enum: ['not delivered', 'delivery', 'delivered'],
      default: 1,
    },
    list_product: {
      type: [productSchema],
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now(),
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

// console.log(Order.where({ status: 'done' }));

module.exports = Order;
