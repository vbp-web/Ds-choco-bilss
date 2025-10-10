const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const mockProducts = require('../data/mockProducts');

// Get all products
router.get('/', async (req, res) => {
  try {
    const { category, featured } = req.query;
    
    // Check if MongoDB is connected
    if (Product.db.readyState !== 1) {
      console.log('MongoDB not connected, using mock data');
      
      let products = mockProducts;
      
      if (category && category !== 'all') {
        products = products.filter(product => product.category === category);
      }
      
      if (featured === 'true') {
        products = products.filter(product => product.featured === true);
      }
      
      return res.json(products);
    }
    
    // Use real MongoDB data
    let query = {};
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    if (featured === 'true') {
      query.featured = true;
    }
    
    const products = await Product.find(query).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    // Check if MongoDB is connected
    if (Product.db.readyState !== 1) {
      console.log('MongoDB not connected, using mock data');
      const product = mockProducts.find(p => p._id === req.params.id);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      return res.json(product);
    }
    
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// Get product categories
router.get('/categories/list', async (req, res) => {
  try {
    // Check if MongoDB is connected
    if (Product.db.readyState !== 1) {
      console.log('MongoDB not connected, using mock data');
      const categories = [...new Set(mockProducts.map(product => product.category))];
      return res.json(categories);
    }
    
    const categories = await Product.distinct('category');
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

module.exports = router;