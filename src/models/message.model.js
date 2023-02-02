const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const messageSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    },
    message: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    },
    time: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

messageSchema.plugin(toJSON);
messageSchema.plugin(paginate);

const Order = mongoose.model('Message', messageSchema);

module.exports = Order;
