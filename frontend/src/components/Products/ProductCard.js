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
        className="product-card-3d overflow-hidden h-full flex flex-col gpu-accelerated"
        whileHover={{ 
          y: -8,
          rotateY: 5,
          rotateX: 2,
          scale: 1.02
        }}
        transition={{ 
          duration: 0.4,
          ease: "easeOut",
          type: "spring",
          stiffness: 300,
          damping: 20
        }}
        initial={{ opacity: 0, y: 20, rotateX: -10 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
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
                  rotateY: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                🍫
              </motion.div>
            </div>
          )}
          {product.featured && (
            <motion.div 
              className="absolute top-2 left-2 bg-gold-500 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-3d"
              animate={{ 
                scale: [1, 1.1, 1],
                rotateZ: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Featured
            </motion.div>
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
            <motion.span 
              className="text-xs text-chocolate-500 bg-chocolate-100 px-2 py-1 rounded"
              whileHover={{ 
                scale: 1.1,
                rotateZ: 5
              }}
              transition={{ duration: 0.2 }}
            >
              {product.category}
            </motion.span>
          </div>

          <motion.button
            onClick={() => setShowModal(true)}
            className="btn-primary w-full mt-auto"
            whileHover={{ 
              scale: 1.05,
              rotateX: 5
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {hasMultipleOptions ? 'View Options' : 'Add to Cart'}
          </motion.button>
        </div>
      </motion.div>

      {/* Product Modal */}
      {showModal && (
        <ProductModal
          product={product}
          onClose={() => setShowModal(false)}
          onAddToCart={handleAddToCart}
        />
      )}
    </>
  );
};

export default ProductCard;
