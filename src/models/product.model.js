const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

const { toJSON, paginate } = require('./plugins');

const productSchema = mongoose.Schema(
  {
    category_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Category',
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    slug: {
      type: String,
      slug: ['name'],
      trim: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
      min: 0,
    },
    star: {
      min: 0,
      max: 5,
      type: Number,
      required: true,
      trim: true,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      max: 45,
      trim: true,
    },
    information: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    shipping: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
productSchema.plugin(toJSON);
productSchema.plugin(paginate);
productSchema.plugin(slug);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
