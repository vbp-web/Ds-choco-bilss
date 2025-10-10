import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { FaTrash, FaPlus, FaMinus, FaShoppingBag } from 'react-icons/fa';
import toast from 'react-hot-toast';

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();

  const handleRemoveItem = (productId, option) => {
    removeFromCart(productId, option);
    toast.success('Item removed from cart');
  };

  const handleQuantityChange = (productId, option, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId, option);
    } else {
      updateQuantity(productId, option, newQuantity);
    }
  };

  const handleClearCart = () => {
    clearCart();
    toast.success('Cart cleared');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-50 to-chocolate-50 flex flex-col justify-center items-center px-4">
        <motion.div 
          className="text-center max-w-md w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            className="text-7xl sm:text-8xl mb-6"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            🛒
          </motion.div>
          <motion.h1 
            className="text-3xl sm:text-4xl font-serif font-bold text-chocolate-700 mb-3"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Your Cart is Empty
          </motion.h1>
          <motion.p 
            className="text-lg sm:text-xl text-chocolate-600 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Looks like you haven't added any delicious chocolates to your cart yet.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <Link
              to="/products"
              className="btn-primary inline-block px-6 py-3 text-base sm:text-lg"
            >
              Start Shopping
            </Link>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-chocolate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <motion.div 
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-3xl sm:text-4xl font-serif font-bold text-chocolate-700"
            whileHover={{ scale: 1.05 }}
          >
            Shopping Cart
          </motion.h1>
          <motion.button
            onClick={handleClearCart}
            className="text-chocolate-600 hover:text-chocolate-800 text-sm sm:text-base font-medium transition-all duration-300 self-start sm:self-auto"
            whileHover={{ scale: 1.1, rotateZ: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            Clear Cart
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={`${item.productId}-${item.option}`}
                className="bg-white rounded-lg shadow-lg p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                {/* Product Image */}
                <motion.div 
                  className="w-20 h-20 bg-gradient-to-br from-chocolate-100 to-chocolate-200 rounded-lg flex items-center justify-center mx-auto sm:mx-0"
                  whileHover={{ scale: 1.1 }}
                >
                  <motion.div 
                    className="text-2xl"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    🍫
                  </motion.div>
                </motion.div>

                {/* Product Info */}
                <div className="flex-1 w-full">
                  <motion.h3 
                    className="text-lg font-semibold text-chocolate-700"
                    whileHover={{ scale: 1.05 }}
                  >
                    {item.productName}
                  </motion.h3>
                  <p className="text-chocolate-600 text-sm sm:text-base">{item.option}</p>
                  <motion.p 
                    className="text-lg font-bold text-chocolate-700 mt-1"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                  >
                    ₹{item.price}
                  </motion.p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-2 sm:space-x-3 mx-auto sm:mx-0">
                  <motion.button
                    onClick={() => handleQuantityChange(item.productId, item.option, item.quantity - 1)}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    whileHover={{ scale: 1.2, rotateZ: -10 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaMinus className="h-4 w-4" />
                  </motion.button>
                  <motion.span 
                    className="text-base sm:text-lg font-semibold px-2 sm:px-3"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                  >
                    {item.quantity}
                  </motion.span>
                  <motion.button
                    onClick={() => handleQuantityChange(item.productId, item.option, item.quantity + 1)}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    whileHover={{ scale: 1.2, rotateZ: 10 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaPlus className="h-4 w-4" />
                  </motion.button>
                </div>

                {/* Total Price + Remove */}
                <div className="flex items-center justify-between sm:flex-col sm:justify-center sm:items-end w-full sm:w-auto">
                  <motion.p 
                    className="text-base sm:text-lg font-bold text-chocolate-700"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                  >
                    ₹{item.price * item.quantity}
                  </motion.p>
                  <motion.button
                    onClick={() => handleRemoveItem(item.productId, item.option)}
                    className="mt-2 sm:mt-3 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all"
                    whileHover={{ scale: 1.2, rotateZ: 10 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaTrash className="h-4 w-4" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div 
              className="bg-white rounded-lg shadow-lg p-5 sm:p-6 sticky top-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <motion.h2 
                className="text-2xl font-serif font-bold text-chocolate-700 mb-5"
                whileHover={{ scale: 1.05 }}
              >
                Order Summary
              </motion.h2>

              <div className="space-y-3 mb-5 text-sm sm:text-base">
                <div className="flex justify-between">
                  <span className="text-chocolate-600">
                    Items ({items.reduce((total, item) => total + item.quantity, 0)})
                  </span>
                  <span className="font-semibold">₹{getTotalPrice()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-chocolate-600">Delivery</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
                <hr className="border-chocolate-200" />
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-chocolate-700">Total</span>
                  <span className="text-chocolate-700">₹{getTotalPrice()}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="btn-primary w-full text-center block py-2 sm:py-3 text-sm sm:text-base"
              >
                Proceed to Checkout
              </Link>

              <Link
                to="/products"
                className="btn-secondary w-full text-center block py-2 sm:py-3 mt-3 text-sm sm:text-base"
              >
                Continue Shopping
              </Link>

              <div className="mt-5 p-3 sm:p-4 bg-chocolate-50 rounded-lg shadow-md flex space-x-3">
                <FaShoppingBag className="h-5 w-5 text-chocolate-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-chocolate-700 mb-1 text-sm sm:text-base">
                    Free Delivery
                  </h3>
                  <p className="text-xs sm:text-sm text-chocolate-600">
                    We deliver fresh chocolates to your doorstep with care and love.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
