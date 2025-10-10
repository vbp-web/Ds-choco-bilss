import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FaCheckCircle, FaShoppingBag, FaPhone } from 'react-icons/fa';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const OrderSuccess = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`/api/orders/${orderId}`);
        setOrder(response.data);
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-50 to-chocolate-50 flex items-center justify-center">
        <LoadingSpinner size="large" text="Loading order details..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-chocolate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Success Icon */}
          <motion.div
            className="mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
          >
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaCheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </motion.div>

          {/* Success Message */}
          <motion.h1 
            className="text-4xl font-serif font-bold text-chocolate-700 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Order Placed Successfully!
          </motion.h1>

          <motion.p 
            className="text-xl text-chocolate-600 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Thank you for choosing D's Choco Bliss! Your order has been confirmed and we'll start preparing your delicious chocolates right away.
          </motion.p>

          {/* Order Details */}
          {order && (
            <motion.div 
              className="card p-8 mb-8 text-left max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h2 className="text-2xl font-serif font-bold text-chocolate-700 mb-6">
                Order Details
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-semibold text-chocolate-700">Order ID:</span>
                  <span className="text-chocolate-600">#{order._id.slice(-8).toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-chocolate-700">Customer:</span>
                  <span className="text-chocolate-600">{order.customer.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-chocolate-700">Email:</span>
                  <span className="text-chocolate-600">{order.customer.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-chocolate-700">Phone:</span>
                  <span className="text-chocolate-600">{order.customer.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-chocolate-700">Total Amount:</span>
                  <span className="text-chocolate-600 font-bold">₹{order.totalAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-chocolate-700">Status:</span>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="mt-6 pt-6 border-t border-chocolate-200">
                <h3 className="font-semibold text-chocolate-700 mb-2">Delivery Address:</h3>
                <p className="text-chocolate-600">
                  {order.customer.address.street}<br />
                  {order.customer.address.city}, {order.customer.address.state} - {order.customer.address.pincode}
                </p>
              </div>

              {/* Order Items */}
              <div className="mt-6 pt-6 border-t border-chocolate-200">
                <h3 className="font-semibold text-chocolate-700 mb-4">Order Items:</h3>
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-chocolate-600">
                        {item.productName} ({item.option}) × {item.quantity}
                      </span>
                      <span className="font-semibold text-chocolate-700">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Next Steps */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <h2 className="text-2xl font-serif font-bold text-chocolate-700 mb-4">
              What's Next?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="p-6 bg-white rounded-lg shadow-lg">
                <div className="w-12 h-12 bg-chocolate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaShoppingBag className="h-6 w-6 text-chocolate-600" />
                </div>
                <h3 className="font-semibold text-chocolate-700 mb-2">Order Confirmation</h3>
                <p className="text-sm text-chocolate-600">
                  You'll receive an email confirmation with all the details of your order.
                </p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-lg">
                <div className="w-12 h-12 bg-chocolate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">👨‍🍳</span>
                </div>
                <h3 className="font-semibold text-chocolate-700 mb-2">Preparation</h3>
                <p className="text-sm text-chocolate-600">
                  Our expert chocolatiers will start crafting your delicious chocolates with love.
                </p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-lg">
                <div className="w-12 h-12 bg-chocolate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🚚</span>
                </div>
                <h3 className="font-semibold text-chocolate-700 mb-2">Delivery</h3>
                <p className="text-sm text-chocolate-600">
                  Fresh chocolates will be delivered to your doorstep with care and love.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <Link
              to="/products"
              className="btn-primary px-8 py-3"
            >
              Continue Shopping
            </Link>
            <a
              href="tel:+919023974421"
              className="btn-secondary px-8 py-3"
            >
              <FaPhone className="inline mr-2" />
              Call Us: +91 90239 74421
            </a>
          </motion.div>

          {/* Thank You Message */}
          <motion.div 
            className="mt-12 p-6 bg-chocolate-50 rounded-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            <p className="text-chocolate-700 font-medium text-center">
              Thank you for choosing D's Choco Bliss! We can't wait for you to experience the bliss in every bite. 
              Follow us on Instagram <a href="https://instagram.com/D_CHOCO_BLISS" className="text-chocolate-800 font-semibold hover:underline">@D_CHOCO_BLISS</a> for updates and more delicious content!
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderSuccess;










