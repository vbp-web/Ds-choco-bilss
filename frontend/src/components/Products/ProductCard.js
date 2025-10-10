import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import toast from 'react-hot-toast';
import ProductModal from './ProductModal';

const ProductCard = ({ product }) => {
  const [showModal, setShowModal] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = (option, quantity = 1) => {
    addToCart(product, option, quantity);
    toast.success(`${product.name} (${option.name}) added to cart!`);
    setShowModal(false);
  };

  const getStartingPrice = () => {
    if (product.options && product.options.length > 0) {
      const prices = product.options.map(option => option.price);
      const minPrice = Math.min(...prices);
      return minPrice;
    }
    return 0;
  };

  const hasMultipleOptions = product.options && product.options.length > 1;

  return (
    <>
      <motion.div
        className="relative overflow-hidden h-full flex flex-col"
        whileHover={{ y: -4, scale: 1.01 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Product Image */}
        <div className="relative h-48 bg-gradient-to-br from-chocolate-100 to-chocolate-200 overflow-hidden">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="text-6xl"
                animate={{
                  scale: [1, 1.05, 1]
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
          {product.featured && (
            <div className="absolute top-2 left-2 bg-gold-500 text-white px-2 py-1 rounded-full text-xs font-semibold shadow">
              Featured
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4 flex flex-col flex-grow">
          <motion.h3
            className="text-lg font-serif font-semibold text-chocolate-700 mb-2 line-clamp-2"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            {product.name}
          </motion.h3>
          <p className="text-sm text-chocolate-600 mb-3 flex-grow line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center justify-between mb-3">
            <motion.span
              className="text-lg font-bold text-chocolate-700"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              {hasMultipleOptions ? `From ₹${getStartingPrice()}` : `₹${getStartingPrice()}`}
            </motion.span>
            <span className="text-xs text-chocolate-500 bg-chocolate-100 px-2 py-1 rounded">
              {product.category}
            </span>
          </div>

          <motion.button
            onClick={() => setShowModal(true)}
            className="btn-primary w-full mt-auto"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {hasMultipleOptions ? 'View Options' : 'Add to Cart'}
          </motion.button>
        </div>
      </motion.div>

      {/* Anchored Product Panel */}
      {showModal && (
        <div className="absolute inset-0 z-20">
          <div
            className="absolute inset-0 bg-black bg-opacity-40"
            onClick={() => setShowModal(false)}
          />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md sm:max-w-lg bg-white rounded-lg shadow-lg p-4 sm:p-6 max-h-[80vh] overflow-y-auto">
            <ProductModal
              product={product}
              onClose={() => setShowModal(false)}
              onAddToCart={handleAddToCart}
              useOverlay={false}
            />
          </div>
        </div>
      )}



    </>
  );
};

export default ProductCard;
