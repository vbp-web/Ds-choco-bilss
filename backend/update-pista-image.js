const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

async function updatePistaImage() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB Atlas');

    // Update Pista Kunafa product with local image
    const result = await Product.updateOne(
      { name: "Pista Kunafa" },
      { 
        $set: { 
          image: "/images/products/pista-kunafa.jpg" 
        } 
      }
    );

    if (result.modifiedCount > 0) {
      console.log('✅ Successfully updated Pista Kunafa image!');
      console.log('Image path: /images/products/pista-kunafa.jpg');
    } else {
      console.log('❌ Pista Kunafa product not found or no changes made');
    }

    // Verify the update
    const updatedProduct = await Product.findOne({ name: "Pista Kunafa" });
    if (updatedProduct) {
      console.log('Updated product details:');
      console.log(`Name: ${updatedProduct.name}`);
      console.log(`Image: ${updatedProduct.image}`);
    }

    process.exit(0);
  } catch (error) {
    console.error('Error updating product:', error);
    process.exit(1);
  }
}

updatePistaImage();



