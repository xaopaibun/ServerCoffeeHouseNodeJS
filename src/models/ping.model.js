const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const pingSchema = mongoose.Schema(
  {
    number_of_users: {
      type: Number,
      default: 0,
    },
    date: {
      type: String,
      default: new Date().toLocaleDateString(),
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
pingSchema.plugin(toJSON);
pingSchema.plugin(paginate);

const Category = mongoose.model('Ping', pingSchema);

module.exports = Category;
