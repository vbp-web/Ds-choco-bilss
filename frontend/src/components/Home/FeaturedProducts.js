import React from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../Products/ProductCard';
import LoadingSpinner from '../UI/LoadingSpinner';

const FeaturedProducts = ({ products }) => {
  if (!products || products.length === 0) {
    return (
      <section className="py-16 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-serif font-bold text-chocolate-700 mb-8">
            Featured Products
          </h2>
          <p className="text-xl text-chocolate-600">
            Loading our featured chocolates...
          </p>
          <LoadingSpinner />
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-serif font-bold text-chocolate-700 mb-4">
            Featured Products
          </h2>
          <p className="text-xl text-chocolate-600 max-w-2xl mx-auto">
            Discover our most popular and highly-rated chocolate creations that our customers love.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.slice(0, 8).map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {products.length === 0 && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-6xl mb-4">🍫</div>
            <h3 className="text-2xl font-serif font-semibold text-chocolate-700 mb-2">
              No Featured Products Yet
            </h3>
            <p className="text-chocolate-600">
              We're working on curating our best products for you!
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;




























