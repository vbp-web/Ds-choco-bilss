const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

const products = [
  // Kunafa Special
  {
    name: "Pista Kunafa",
    category: "Kunafa Special", 
    description: "Delicious kunafa with pistachio filling wrapped in premium chocolate",
    featured: true,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    options: [
      { name: "Small", price: 79, description: "Perfect for a single serving" },
      { name: "Medium", price: 279, description: "Great for sharing" },
      { name: "Large", price: 299, description: "Family size" }
    ]
  },
  {
    name: "Biscoff Kunafa",
    category: "Kunafa Special",
    description: "Rich kunafa with Biscoff spread and premium chocolate coating",
    featured: true,
    image: "/images/products/biscoff-kunafa.jpeg",
    options: [
      { name: "Medium", price: 349, description: "Great for sharing" },
      { name: "Large", price: 599, description: "Family size" }
    ]
  },

  // Classic Chocolate Bars
  {
    name: "Plain Dark Chocolate Bar",
    category: "Classic Chocolate Bars",
    description: "Pure dark chocolate bar with rich cocoa flavor",
    featured: true,
    image: "/images/products/Plain Dark Chocolate Bar.jpeg",
    options: [
      { name: "Small", price: 30, description: "50g bar" },
      { name: "Medium", price: 70, description: "100g bar" },
      { name: "Large", price: 100, description: "150g bar" }
    ]
  },
  {
    name: "Plain Milk Chocolate Bar",
    category: "Classic Chocolate Bars",
    description: "Creamy milk chocolate bar with smooth texture",
    featured: true,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    options: [
      { name: "Small", price: 35, description: "50g bar" },
      { name: "Medium", price: 75, description: "100g bar" },
      { name: "Large", price: 105, description: "150g bar" }
    ]
  },
  {
    name: "Plain White Chocolate Bar",
    category: "Classic Chocolate Bars",
    description: "Rich white chocolate bar with vanilla flavor",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    options: [
      { name: "Small", price: 40, description: "50g bar" },
      { name: "Medium", price: 85, description: "100g bar" },
      { name: "Large", price: 120, description: "150g bar" }
    ]
  },

  // Signature Blends
  {
    name: "Marvel Double",
    category: "Signature Blends",
    description: "Double layer chocolate with unique flavor combination",
    featured: true,
    image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    options: [
      { name: "Medium", price: 139, description: "100g bar" },
      { name: "Large", price: 210, description: "150g bar" }
    ]
  },
  {
    name: "Dark+Milk",
    category: "Signature Blends",
    description: "Perfect blend of dark and milk chocolate",
    featured: true,
    options: [
      { name: "Medium", price: 149, description: "100g bar" },
      { name: "Large", price: 219, description: "150g bar" }
    ]
  },
  {
    name: "Milk+White",
    category: "Signature Blends",
    description: "Creamy combination of milk and white chocolate",
    options: [
      { name: "Medium", price: 139, description: "100g bar" },
      { name: "Large", price: 210, description: "150g bar" }
    ]
  },
  {
    name: "White+Dark",
    category: "Signature Blends",
    description: "Elegant combination of white and dark chocolate",
    options: [
      { name: "Standard", price: 149, description: "100g bar" }
    ]
  },
  {
    name: "Bubbly",
    category: "Signature Blends",
    description: "Unique bubbly texture chocolate with surprising crunch",
    options: [
      { name: "Standard", price: 149, description: "100g bar" }
    ]
  },
  {
    name: "Heart Shape",
    category: "Signature Blends",
    description: "Romantic heart-shaped chocolate perfect for special occasions",
    options: [
      { name: "Standard", price: 199, description: "Special heart shape" }
    ]
  },

  // Inspired Bars
  {
    name: "Bounty Bar",
    category: "Inspired Bars",
    description: "Coconut-filled chocolate bar inspired by the classic",
    featured: true,
    image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    options: [
      { name: "2 Pcs", price: 130, description: "2 pieces pack" },
      { name: "5 Pcs", price: 249, description: "5 pieces pack" }
    ]
  },
  {
    name: "Pan Chocolate",
    category: "Inspired Bars",
    description: "Crunchy chocolate with pan-like texture",
    options: [
      { name: "3 Pcs", price: 100, description: "3 pieces pack" },
      { name: "1 Pc", price: 150, description: "Single large piece" }
    ]
  },
  {
    name: "Crazy Crunch",
    category: "Inspired Bars",
    description: "Extra crunchy chocolate with multiple textures",
    options: [
      { name: "3 Pcs", price: 100, description: "3 pieces pack" },
      { name: "1 Pc", price: 150, description: "Single large piece" }
    ]
  },
  {
    name: "Cornflakes Rocks",
    category: "Inspired Bars",
    description: "Chocolate-coated cornflakes with rocky texture",
    options: [
      { name: "2 Pcs", price: 50, description: "2 pieces pack" }
    ]
  },
  {
    name: "Chocolate Nutty Rock",
    category: "Inspired Bars",
    description: "Nutty chocolate with rocky texture and mixed nuts",
    options: [
      { name: "Small", price: 120, description: "75g pack" },
      { name: "Medium", price: 190, description: "125g pack" }
    ]
  },

  // Premium Chocolate
  {
    name: "Truffle Chocolate",
    category: "Premium Chocolate",
    description: "Premium truffle chocolate with rich ganache center",
    featured: true,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    options: [
      { name: "3 Pcs", price: 179, description: "3 truffles" },
      { name: "5 Pcs", price: 249, description: "5 truffles" }
    ]
  },
  {
    name: "Ferrao Rocher Chocolate Bar",
    category: "Premium Chocolate",
    description: "Premium chocolate bar inspired by Ferrero Rocher",
    featured: true,
    options: [
      { name: "Standard", price: 249, description: "Premium quality bar" }
    ]
  },
  {
    name: "Coated Nuts",
    category: "Premium Chocolate",
    description: "Premium chocolate-coated nuts - Caramelised Almond, Raisins, Almonds, Cashew",
    options: [
      { name: "50gm", price: 160, description: "Mixed coated nuts" }
    ]
  },
  {
    name: "Roasted Almond Chocolate Bar",
    category: "Premium Chocolate",
    description: "Rich chocolate bar with roasted almonds",
    options: [
      { name: "Medium", price: 99, description: "100g bar" },
      { name: "Large", price: 210, description: "150g bar" }
    ]
  },
  {
    name: "Cashew Crunch Chocolate Bar",
    category: "Premium Chocolate",
    description: "Creamy chocolate with crunchy cashews",
    options: [
      { name: "Medium", price: 130, description: "100g bar" },
      { name: "Large", price: 210, description: "150g bar" }
    ]
  },
  {
    name: "Hazelnut Chocolate Bar",
    category: "Premium Chocolate",
    description: "Rich chocolate with premium hazelnuts",
    options: [
      { name: "Medium", price: 130, description: "100g bar" },
      { name: "Large", price: 210, description: "150g bar" }
    ]
  },
  {
    name: "Butterscotch Chocolate Bar",
    category: "Premium Chocolate",
    description: "Sweet butterscotch flavor chocolate bar",
    options: [
      { name: "Medium", price: 130, description: "100g bar" }
    ]
  },
  {
    name: "Exotic Chocolate Bites",
    category: "Premium Chocolate",
    description: "White chocolate with rose petals - exotic and elegant",
    options: [
      { name: "6 Pcs", price: 150, description: "6 exotic bites" }
    ]
  },

  // Special Bar
  {
    name: "Nutty Temptation",
    category: "Special Bar",
    description: "Irresistible chocolate with mixed nuts",
    featured: true,
    image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    options: [
      { name: "Small", price: 140, description: "75g bar" },
      { name: "Medium", price: 209, description: "125g bar" }
    ]
  },
  {
    name: "Oreo Crunch Chocolate Bar",
    category: "Special Bar",
    description: "Chocolate bar with Oreo cookie pieces",
    options: [
      { name: "Small", price: 130, description: "75g bar" },
      { name: "Large", price: 210, description: "150g bar" }
    ]
  },
  {
    name: "Mixed Dryfruit Chocolate Bar",
    category: "Special Bar",
    description: "Healthy chocolate bar with mixed dry fruits",
    options: [
      { name: "Small", price: 150, description: "75g bar" },
      { name: "Medium", price: 199, description: "125g bar" }
    ]
  },
  {
    name: "Soft Jelly Centered Chocolate Bar",
    category: "Special Bar",
    description: "Chocolate bar with soft jelly center",
    options: [
      { name: "6 Pcs", price: 150, description: "6 pieces" },
      { name: "Bar", price: 199, description: "Single large bar" }
    ]
  },
  {
    name: "Wafer Chocolate Bar",
    category: "Special Bar",
    description: "Crispy wafer layered chocolate bar",
    options: [
      { name: "Medium", price: 120, description: "100g bar" },
      { name: "Large", price: 170, description: "150g bar" }
    ]
  },
  {
    name: "Choco Pop Lollipop",
    category: "Special Bar",
    description: "Fun chocolate lollipop on a stick",
    options: [
      { name: "Per pc", price: 60, description: "Single lollipop" }
    ]
  },
  {
    name: "Golden Bite Caramelised Choco",
    category: "Special Bar",
    description: "Golden caramelized chocolate bite",
    options: [
      { name: "Standard", price: 140, description: "Premium bite" }
    ]
  },
  {
    name: "Proti Bar (Sugar Free)",
    category: "Special Bar",
    description: "Healthy protein bar without sugar",
    options: [
      { name: "Standard", price: 170, description: "Sugar-free protein bar" }
    ]
  },
  {
    name: "Puffed Quinoa & Pistachio Bars",
    category: "Special Bar",
    description: "Healthy bars with puffed quinoa and pistachios",
    options: [
      { name: "Standard", price: 150, description: "Healthy snack bar" }
    ]
  },

  // Filling Chocolates
  {
    name: "Mango Filling",
    category: "Filling Chocolates",
    description: "Chocolate with sweet mango filling",
    options: [
      { name: "Per pc", price: 39, description: "Single piece" }
    ]
  },
  {
    name: "Honey Filling",
    category: "Filling Chocolates",
    description: "Chocolate with natural honey filling",
    options: [
      { name: "Per pc", price: 39, description: "Single piece" }
    ]
  },
  {
    name: "Nutella Filling",
    category: "Filling Chocolates",
    description: "Chocolate with rich Nutella filling",
    options: [
      { name: "Per pc", price: 49, description: "Single piece" }
    ]
  },
  {
    name: "Rose Filling",
    category: "Filling Chocolates",
    description: "Chocolate with fragrant rose filling",
    options: [
      { name: "Per pc", price: 39, description: "Single piece" }
    ]
  }
];

async function seedDatabase() {
  try {
    // Use MongoDB Atlas or local MongoDB
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ds-choco-bliss';
    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert new products
    await Product.insertMany(products);
    console.log(`Seeded ${products.length} products successfully`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
