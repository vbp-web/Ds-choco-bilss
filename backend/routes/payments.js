const express = require('express');
const Order = require('../models/Order');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || ''
});

// Create a Razorpay order for payment
router.post('/create-order', async (req, res) => {
  try {
    const { orderId, currency = 'INR' } = req.body;
    if (!orderId) {
      return res.status(400).json({ error: 'orderId is required' });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const amountInMinor = Math.round(Number(order.totalAmount) * 100);

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: amountInMinor,
      currency,
      receipt: `order_${orderId}`,
      notes: {
        orderId: order.id,
        customerName: order.customer.name,
        customerEmail: order.customer.email
      }
    });

    // Update order with payment info
    order.payment = {
      provider: 'razorpay',
      status: 'created',
      currency,
      amount: order.totalAmount,
      referenceId: razorpayOrder.id,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    await order.save();

    return res.json({
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      key: process.env.RAZORPAY_KEY_ID
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return res.status(500).json({ error: 'Failed to create payment order' });
  }
});

// Verify Razorpay payment
router.post('/verify-payment', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;
    
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !orderId) {
      return res.status(400).json({ error: 'Missing required payment parameters' });
    }

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Payment successful
      await Order.findByIdAndUpdate(orderId, {
        status: 'confirmed',
        payment: {
          provider: 'razorpay',
          status: 'succeeded',
          currency: 'INR',
          amount: req.body.amount / 100, // Convert from paise to rupees
          referenceId: razorpay_order_id,
          chargeId: razorpay_payment_id,
          method: 'razorpay',
          updatedAt: new Date()
        }
      });

      return res.json({ 
        success: true, 
        message: 'Payment verified successfully',
        orderId: orderId
      });
    } else {
      // Payment failed
      await Order.findByIdAndUpdate(orderId, {
        payment: {
          provider: 'razorpay',
          status: 'failed',
          currency: 'INR',
          amount: req.body.amount / 100,
          referenceId: razorpay_order_id,
          errorMessage: 'Invalid signature',
          updatedAt: new Date()
        }
      });

      return res.status(400).json({ 
        success: false, 
        message: 'Payment verification failed' 
      });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    return res.status(500).json({ error: 'Payment verification failed' });
  }
});

// Cash on Delivery: mark order as COD and set payment status
router.post('/cod', async (req, res) => {
  try {
    const { orderId } = req.body;
    if (!orderId) {
      return res.status(400).json({ error: 'orderId is required' });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    order.payment = {
      provider: 'cod',
      status: 'cod_pending',
      currency: order.payment?.currency || 'inr',
      amount: order.totalAmount,
      method: 'cash',
      createdAt: order.payment?.createdAt || new Date(),
      updatedAt: new Date()
    };
    // Optionally mark order as confirmed for processing
    order.status = 'confirmed';
    await order.save();

    return res.json({
      message: 'Order set to Cash on Delivery',
      orderId: order.id,
      payment: order.payment,
      status: order.status
    });
  } catch (error) {
    console.error('Error setting COD:', error);
    return res.status(500).json({ error: 'Failed to set Cash on Delivery for order' });
  }
});

module.exports = router;


