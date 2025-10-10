import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/Products/ProductCard';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { motion } from 'framer-motion';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsResponse, categoriesResponse] = await Promise.all([
          axios.get('/api/products'),
          axios.get('/api/products/categories/list')
        ]);
        
        setProducts(productsResponse.data);
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-50 to-chocolate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <LoadingSpinner size="large" text="Loading our chocolate collection..." />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-chocolate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-serif font-bold text-chocolate-700 mb-4">
            Our Chocolate Collection
          </h1>
          <p className="text-xl text-chocolate-600 max-w-3xl mx-auto">
            Discover our complete range of premium homemade chocolates. Each piece is crafted with love and the finest ingredients to bring you the ultimate chocolate experience.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-6 py-3 rounded-full font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-chocolate-700 text-white'
                  : 'bg-white text-chocolate-700 hover:bg-chocolate-100 border border-chocolate-200'
              }`}
            >
              All Products
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-6 py-3 rounded-full font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-chocolate-700 text-white'
                    : 'bg-white text-chocolate-700 hover:bg-chocolate-100 border border-chocolate-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Products Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))
          ) : (
            <motion.div 
              className="col-span-full text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-6xl mb-4">🍫</div>
              <h3 className="text-2xl font-serif font-semibold text-chocolate-700 mb-2">
                No products found
              </h3>
              <p className="text-chocolate-600 mb-6">
                We couldn't find any products in this category.
              </p>
              <button
                onClick={() => handleCategoryChange('all')}
                className="btn-primary"
              >
                View All Products
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Results Count */}
        {filteredProducts.length > 0 && (
          <motion.div 
            className="text-center mt-12 text-chocolate-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            {selectedCategory !== 'all' && ` in ${selectedCategory}`}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;










