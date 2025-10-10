// Mock products data for testing without MongoDB
const mockProducts = [
  {
    _id: "mock1",
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
    _id: "mock2",
    name: "Biscoff Kunafa",
    category: "Kunafa Special",
    description: "Rich kunafa with Biscoff spread and premium chocolate coating",
    featured: true,
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    options: [
      { name: "Medium", price: 349, description: "Great for sharing" },
      { name: "Large", price: 599, description: "Family size" }
    ]
  },
  {
    _id: "mock3",
    name: "Plain Dark Chocolate Bar",
    category: "Classic Chocolate Bars",
    description: "Pure dark chocolate bar with rich cocoa flavor",
    featured: true,
    image: "https://images.unsplash.com/photo-1511381939415-e44015466834?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    options: [
      { name: "Small", price: 30, description: "50g bar" },
      { name: "Medium", price: 70, description: "100g bar" },
      { name: "Large", price: 100, description: "150g bar" }
    ]
  },
  {
    _id: "mock4",
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
    _id: "mock5",
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
    _id: "mock6",
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
    _id: "mock7",
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
    _id: "mock8",
    name: "Nutty Temptation",
    category: "Special Bar",
    description: "Irresistible chocolate with mixed nuts",
    featured: true,
    image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    options: [
      { name: "Small", price: 140, description: "75g bar" },
      { name: "Medium", price: 209, description: "125g bar" }
    ]
  }
];

module.exports = mockProducts;
