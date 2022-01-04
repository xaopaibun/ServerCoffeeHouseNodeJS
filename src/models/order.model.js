const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const productSchema = mongoose.Schema({
  id: mongoose.SchemaTypes.ObjectId,
  name: String,
  image: String,
  price: Number,
  quatity: Number,
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
    payment: {
      type: String,
      enum: ['Unpaid', 'paid'],
    },
    shipping_information: {
      type: String,
      enum: ['not delivered', 'delivery', 'delivered'],
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

// console.log(Order.where({ status: 'done' }));

module.exports = Order;
