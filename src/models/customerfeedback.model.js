const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const CustomerFeedbackSchema = mongoose.Schema(
  {
    product_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Product',
      required: true,
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
    star: {
      min: 0,
      max: 5,
      type: Number,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
CustomerFeedbackSchema.plugin(toJSON);
CustomerFeedbackSchema.plugin(paginate);

const CustomerFeedback = mongoose.model('CustomerFeedback', CustomerFeedbackSchema);

module.exports = CustomerFeedback;
