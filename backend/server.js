const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
// Stripe webhook requires raw body on webhook route; apply JSON for others
app.use((req, res, next) => {
  if (req.originalUrl === '/api/payments/webhook') {
    next();
  } else {
    express.json()(req, res, next);
  }
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/payments', require('./routes/payments'));

// Serve product images statically so clients can access /images/products/...
const path = require('path');
app.use('/images', express.static(path.join(__dirname, '../frontend/public/images')));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ message: 'D\'s Choco Bliss API is running!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://https://ds-choco-bilss-4ncg.vercel.app/api/health`);
  console.log(`Products API: http://localhost:${PORT}/api/products`);
});
