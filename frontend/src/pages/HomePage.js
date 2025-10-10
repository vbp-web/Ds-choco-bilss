import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import HeroSection from '../components/Home/HeroSection';
import CategoriesSection from '../components/Home/CategoriesSection';
import FeaturedProducts from '../components/Home/FeaturedProducts';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get('/api/products?featured=true');
        setFeaturedProducts(response.data);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const categories = [
    {
      name: 'Kunafa Special',
      description: 'Unique kunafa chocolates',
      image: '/images/kunafa-category.jpg',
      link: '/products?category=Kunafa Special'
    },
    {
      name: 'Classic Chocolate Bars',
      description: 'Traditional chocolate bars',
      image: '/images/classic-category.jpg',
      link: '/products?category=Classic Chocolate Bars'
    },
    {
      name: 'Signature Blends',
      description: 'Our special combinations',
      image: '/images/signature-category.jpg',
      link: '/products?category=Signature Blends'
    },
    {
      name: 'Premium Chocolate',
      description: 'Luxury chocolate collection',
      image: '/images/premium-category.jpg',
      link: '/products?category=Premium Chocolate'
    },
    {
      name: 'Inspired Bars',
      description: 'Creative chocolate creations',
      image: '/images/inspired-category.jpg',
      link: '/products?category=Inspired Bars'
    },
    {
      name: 'Special Bar',
      description: 'Unique and special chocolates',
      image: '/images/special-category.jpg',
      link: '/products?category=Special Bar'
    }
  ];

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Categories Section */}
      <CategoriesSection categories={categories} />

      {/* Featured Products */}
      <FeaturedProducts products={featuredProducts} />

      {/* Call to Action */}
      <motion.section 
        className="py-16 bg-gradient-to-r from-chocolate-700 to-chocolate-800"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            className="text-4xl font-serif font-bold text-white mb-6"
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Ready to Experience Bliss?
          </motion.h2>
          <motion.p 
            className="text-xl text-chocolate-100 mb-8 max-w-2xl mx-auto"
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Browse our complete collection of premium homemade chocolates and find your perfect treat.
          </motion.p>
          <motion.div
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              to="/products"
              className="inline-block bg-gold-500 hover:bg-gold-600 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Shop All Products
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default HomePage;




























