import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaLock } from 'react-icons/fa';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      pincode: ''
    },
    notes: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmitOrder = async () => {
    try {
      setLoading(true);
      // Your order submission logic here
      // For example, you might post the formData and items to your backend
      // await axios.post('/api/orders', { ...formData, items, total: getTotalPrice() });
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulating API call
      toast.success('Order placed successfully!');
      clearCart();
      navigate('/success');
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // This is a simplified return statement. The full JSX is quite long.
  // The main logic fix was in the functions above.
  return (
    <div className="bg-cream-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-4xl lg:text-5xl font-serif font-bold text-chocolate-800">
            Checkout
          </h1>
          <p className="mt-4 text-lg text-chocolate-600">
            Complete your purchase by providing the following information.
          </p>
        </motion.div>
        
        {/* Progress Bar */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-center space-x-4 sm:space-x-8">
            {[1, 2, 3].map((step) => (
              <motion.div
                key={step}
                className="flex items-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + step * 0.1 }}
              >
                <motion.div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold shadow-lg ${
                    step <= currentStep
                      ? 'bg-chocolate-700 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  animate={step === currentStep ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                >
                  {step}
                </motion.div>
                <motion.span
                  className={`ml-2 font-medium hidden sm:inline ${
                    step <= currentStep ? 'text-chocolate-700' : 'text-gray-500'
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  {step === 1 ? 'Customer Info' : step === 2 ? 'Address' : 'Review & Pay'}
                </motion.span>
                {step < 3 && (
                  <motion.div
                    className={`w-8 h-0.5 mx-2 sm:mx-4 ${
                      step < currentStep ? 'bg-chocolate-700' : 'bg-gray-200'
                    }`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.6 + step * 0.1, duration: 0.5 }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <motion.div
              className="p-8 shadow-lg bg-white rounded-xl"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 300, damping: 20 }}
              whileHover={{ y: -5, scale: 1.01 }}
            >
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="text-2xl font-serif font-bold text-chocolate-700 mb-6">
                    Customer Information
                  </h2>
                  <div className="space-y-6">
                    {/* Name Input */}
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                      <label className="block text-sm font-medium text-chocolate-700 mb-2">Full Name *</label>
                      <div className="relative">
                        <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-chocolate-500" />
                        <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="input-field pl-10" placeholder="Enter your full name" required />
                      </div>
                    </motion.div>
                    {/* Email Input */}
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                      <label className="block text-sm font-medium text-chocolate-700 mb-2">Email Address *</label>
                      <div className="relative">
                        <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-chocolate-500" />
                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="input-field pl-10" placeholder="Enter your email address" required />
                      </div>
                    </motion.div>
                    {/* Phone Input */}
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                       <label className="block text-sm font-medium text-chocolate-700 mb-2">Phone Number *</label>
                       <div className="relative">
                         <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-chocolate-500" />
                         <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="input-field pl-10" placeholder="Enter your phone number" required />
                       </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                 <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                 >
                   <h2 className="text-2xl font-serif font-bold text-chocolate-700 mb-6">Delivery Address</h2>
                   <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-chocolate-700 mb-2">Street Address *</label>
                        <div className="relative">
                          <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-chocolate-500" />
                          <input type="text" name="address.street" value={formData.address.street} onChange={handleInputChange} className="input-field pl-10" placeholder="Enter your street address" required />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-chocolate-700 mb-2">City *</label>
                          <input type="text" name="address.city" value={formData.address.city} onChange={handleInputChange} className="input-field" placeholder="Enter your city" required />
                        </div>
                        <div>
                           <label className="block text-sm font-medium text-chocolate-700 mb-2">State *</label>
                           <input type="text" name="address.state" value={formData.address.state} onChange={handleInputChange} className="input-field" placeholder="Enter your state" required />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-chocolate-700 mb-2">Pincode *</label>
                        <input type="text" name="address.pincode" value={formData.address.pincode} onChange={handleInputChange} className="input-field" placeholder="Enter your pincode" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-chocolate-700 mb-2">Order Notes (Optional)</label>
                        <textarea name="notes" value={formData.notes} onChange={handleInputChange} className="input-field" rows="3" placeholder="Any special instructions..."></textarea>
                      </div>
                   </div>
                 </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h2 className="text-2xl font-serif font-bold text-chocolate-700 mb-6">Review Your Order</h2>
                  <div className="space-y-6">
                    <div className="p-4 bg-chocolate-50 rounded-lg">
                      <h3 className="font-semibold text-chocolate-700 mb-2">Customer Information</h3>
                      <p className="text-chocolate-600">{formData.name}</p>
                      <p className="text-chocolate-600">{formData.email}</p>
                      <p className="text-chocolate-600">{formData.phone}</p>
                    </div>
                    <div className="p-4 bg-chocolate-50 rounded-lg">
                      <h3 className="font-semibold text-chocolate-700 mb-2">Delivery Address</h3>
                      <p className="text-chocolate-600">{formData.address.street}</p>
                      <p className="text-chocolate-600">{formData.address.city}, {formData.address.state} - {formData.address.pincode}</p>
                    </div>
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <FaLock className="text-green-600" />
                        <h3 className="font-semibold text-green-700">Secure Payment</h3>
                      </div>
                      <p className="text-green-600 text-sm">This is a demo. In a real app, payment gateway integration would be here.</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <motion.div
                className="flex justify-between mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <motion.button
                  onClick={handlePrevStep}
                  disabled={currentStep === 1}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${currentStep === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  whileHover={currentStep !== 1 ? { scale: 1.05 } : {}}
                  whileTap={currentStep !== 1 ? { scale: 0.95 } : {}}
                >
                  Previous
                </motion.button>
                {currentStep < 3 ? (
                  <motion.button
                    onClick={handleNextStep}
                    className="btn-primary px-6 py-3"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Next Step
                  </motion.button>
                ) : (
                  <motion.button
                    onClick={handleSubmitOrder}
                    disabled={loading}
                    className="btn-primary px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={!loading ? { scale: 1.05 } : {}}
                    whileTap={!loading ? { scale: 0.95 } : {}}
                  >
                    {loading ? (
                      <motion.span
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        Placing Order...
                      </motion.span>
                    ) : 'Place Order'
                    }
                  </motion.button>
                )}
              </motion.div>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              className="p-6 sticky top-8 shadow-lg bg-white rounded-xl"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, type: "spring", stiffness: 300, damping: 20 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <h2 className="text-2xl font-serif font-bold text-chocolate-700 mb-6">
                Order Summary
              </h2>
              <div className="space-y-4 mb-6">
                {items.map((item, index) => (
                  <motion.div
                    key={`${item.productId}-${item.option}`}
                    className="flex justify-between items-center p-3 rounded-lg hover:bg-chocolate-50 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div>
                      <p className="font-medium text-chocolate-700">{item.productName}</p>
                      <p className="text-sm text-chocolate-600">{item.option} × {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-chocolate-700">
                      ₹{item.price * item.quantity}
                    </p>
                  </motion.div>
                ))}
              </div>
              <hr className="border-chocolate-200 mb-4" />
              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-chocolate-600">Subtotal</span>
                  <span className="font-semibold">₹{getTotalPrice()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-chocolate-600">Delivery</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-chocolate-700">Total</span>
                  <span className="text-chocolate-700">₹{getTotalPrice()}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

