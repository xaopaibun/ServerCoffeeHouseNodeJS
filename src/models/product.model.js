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
      type: Array,
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
    content: {
      type: String,
      required: true,
      trim: true,
    },
    width: {
      type: Number,
      required: true,
    },
    length: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    variant: {
      type: Object,
      trim: true,
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
