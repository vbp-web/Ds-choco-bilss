const mongoose = require('mongoose');

const productOptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: String
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Kunafa Special',
      'Classic Chocolate Bars',
      'Signature Blends',
      'Inspired Bars',
      'Premium Chocolate',
      'Special Bar',
      'Filling Chocolates'
    ]
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: '/images/placeholder-chocolate.jpg'
  },
  options: [productOptionSchema],
  featured: {
    type: Boolean,
    default: false
  },
  inStock: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);

