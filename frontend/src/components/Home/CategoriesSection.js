import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CategoriesSection = ({ categories }) => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-serif font-bold text-chocolate-700 mb-4">
            Our Chocolate Categories
          </h2>
          <p className="text-xl text-chocolate-600 max-w-2xl mx-auto">
            Explore our diverse collection of premium chocolates, each category crafted with unique flavors and textures.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Link to={category.link}>
                <div className="card overflow-hidden h-full">
                  <div className="relative h-48 bg-gradient-to-br from-chocolate-200 to-chocolate-300">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-6xl text-chocolate-600">
                        🍫
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-serif font-semibold text-chocolate-700 mb-2 group-hover:text-chocolate-900 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-chocolate-600 group-hover:text-chocolate-700 transition-colors">
                      {category.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link
            to="/products"
            className="inline-block bg-chocolate-700 hover:bg-chocolate-800 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
          >
            View All Products
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CategoriesSection;




























