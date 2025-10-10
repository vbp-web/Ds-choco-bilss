import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaMinus, FaPlus } from 'react-icons/fa';

const ProductModal = ({ product, onClose, onAddToCart }) => {
  const [selectedOption, setSelectedOption] = useState(product.options[0]);
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(selectedOption, quantity);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-lg"
          initial={{ 
            scale: 0.8, 
            opacity: 0,
            y: -20
          }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            y: 0
          }}
          exit={{ 
            scale: 0.8, 
            opacity: 0,
            y: 20
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative p-6 border-b">
            <motion.button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              whileHover={{ 
                scale: 1.2, 
                rotateZ: 90,
                color: "#8B4513"
              }}
              whileTap={{ scale: 0.9 }}
            >
              <FaTimes className="h-5 w-5" />
            </motion.button>
            <motion.h2 
              className="text-2xl font-serif font-bold text-chocolate-700 pr-8"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {product.name}
            </motion.h2>
            <motion.p 
              className="text-chocolate-600 mt-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {product.description}
            </motion.p>
          </div>

          {/* Product Image */}
          <motion.div 
            className="h-48 bg-gradient-to-br from-chocolate-100 to-chocolate-200 overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {product.image ? (
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            ) : (
              <div className="h-full flex items-center justify-center">
                <motion.div 
                  className="text-6xl"
                  animate={{ 
                    rotateY: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  🍫
                </motion.div>
              </div>
            )}
          </motion.div>

          {/* Options */}
          <div className="p-6">
            <motion.h3 
              className="text-lg font-semibold text-chocolate-700 mb-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              Choose Size/Option:
            </motion.h3>
            <div className="space-y-2 mb-6">
              {product.options.map((option, index) => (
                <motion.label
                  key={option.name}
                  className={`block p-3 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                    selectedOption.name === option.name
                      ? 'border-chocolate-500 bg-chocolate-50 shadow-3d'
                      : 'border-gray-200 hover:border-chocolate-300 hover:shadow-lg'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ 
                    scale: 1.02,
                    rotateX: 2
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <input
                    type="radio"
                    name="option"
                    value={option.name}
                    checked={selectedOption.name === option.name}
                    onChange={() => setSelectedOption(option)}
                    className="sr-only"
                  />
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold text-chocolate-700">
                        {option.name}
                      </div>
                      {option.description && (
                        <div className="text-sm text-chocolate-600">
                          {option.description}
                        </div>
                      )}
                    </div>
                    <motion.div 
                      className="font-bold text-chocolate-700"
                      whileHover={{ scale: 1.1 }}
                    >
                      ₹{option.price}
                    </motion.div>
                  </div>
                </motion.label>
              ))}
            </div>

            {/* Quantity Selector */}
            <motion.div 
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <h3 className="text-lg font-semibold text-chocolate-700 mb-3">
                Quantity:
              </h3>
              <div className="flex items-center space-x-4">
                <motion.button
                  onClick={() => handleQuantityChange(-1)}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200"
                  disabled={quantity <= 1}
                  whileHover={{ 
                    scale: 1.1, 
                    rotateZ: -5,
                    backgroundColor: "#f3f4f6"
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaMinus className="h-4 w-4" />
                </motion.button>
                <motion.span 
                  className="text-xl font-semibold px-4"
                  animate={{ 
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 0.3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  {quantity}
                </motion.span>
                <motion.button
                  onClick={() => handleQuantityChange(1)}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200"
                  whileHover={{ 
                    scale: 1.1, 
                    rotateZ: 5,
                    backgroundColor: "#f3f4f6"
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaPlus className="h-4 w-4" />
                </motion.button>
              </div>
            </motion.div>

            {/* Total Price */}
            <motion.div 
              className="mb-6 p-4 bg-chocolate-50 rounded-lg shadow-3d"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
              whileHover={{ 
                scale: 1.02,
                rotateX: 2
              }}
            >
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-chocolate-700">
                  Total:
                </span>
                <motion.span 
                  className="text-2xl font-bold text-chocolate-700"
                  animate={{ 
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  ₹{selectedOption.price * quantity}
                </motion.span>
              </div>
            </motion.div>

            {/* Add to Cart Button */}
            <motion.button
              onClick={handleAddToCart}
              className="btn-primary w-full py-3 text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              whileHover={{ 
                scale: 1.05,
                rotateX: 5
              }}
              whileTap={{ scale: 0.95 }}
            >
              Add to Cart - ₹{selectedOption.price * quantity}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductModal;
