const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  option: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true
  }
});

const orderSchema = new mongoose.Schema({
  customer: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    address: {
      street: {
        type: String,
        required: true
      },
      city: {
        type: String,
        required: true
      },
      state: {
        type: String,
        required: true
      },
      pincode: {
        type: String,
        required: true
      }
    }
  },
  items: [orderItemSchema],
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'],
    default: 'pending'
  },
  orderDate: {
    type: Date,
    default: Date.now
  },
  deliveryDate: Date,
  notes: String,
  payment: {
    provider: {
      type: String,
      enum: ['stripe', 'razorpay', 'paypal', 'cod'],
      default: 'stripe'
    },
    status: {
      type: String,
      enum: ['not_initiated', 'requires_payment_method', 'requires_action', 'processing', 'succeeded', 'failed', 'refunded', 'cod_pending'],
      default: 'not_initiated'
    },
    currency: {
      type: String,
      default: 'inr'
    },
    amount: Number,
    referenceId: String,
    chargeId: String,
    method: String,
    errorMessage: String,
    createdAt: Date,
    updatedAt: Date
  }
});

module.exports = mongoose.model('Order', orderSchema);

