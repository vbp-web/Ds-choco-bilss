const mongoose = require('mongoose');
const Product = require('./models/Product');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function updateProductImages() {
  try {
    console.log('🔧 Product Image Updater\n');
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas\n');

    // Define your image mappings here - updated with all your available images
    const imageMappings = {
      "Pista Kunafa": "pista-kunafa.jpg",
      "Biscoff Kunafa": "Biscoff Kunafa.jpg",
      "Plain Dark Chocolate Bar": "Plain Dark Chocolate Bar.jpeg",
      "Plain Milk Chocolate Bar": "Plain Milk Chocolate Bar.jpeg",
      "Plain White Chocolate Bar": "Plain White Chocolate Bar.jpeg",
      
      "Dark+Milk": "Dark+Milk.jpg",
      "Milk+White": "Milk+White.jpeg",
      "White+Dark": "White+Dark.jpeg",
      "Bubbly": "Bubbly.jpg",
      "Heart Shape": "Heart Shape.jpeg",
      "Bounty Bar": "Bounty Bar.jpg",
      "Pan Chocolate": "Pan Chocolate.jpeg",
      "Crazy Crunch": "Crazy Crunch.jpg",
      "Cornflakes Rocks": "Cornflakes Rocks.jpg",
      "Chocolate Nutty Rock": "Chocolate Nutty Rock.jpeg",
      "Truffle Chocolate": "Truffle Chocolate.jpeg",
      "Ferrao Rocher Chocolate Bar": "Ferrao Rocher Chocolate Bar.jpg",
      "Coated Nuts": "Coated Nuts.jpg",
      "Roasted Almond Chocolate Bar": "Roasted Almond Chocolate Bar.jpeg",
      "Cashew Crunch Chocolate Bar": "Cashew Crunch Chocolate Bar.jpg",
      "Hazelnut Chocolate Bar": "Hazelnut Chocolate Bar.jpeg",
      "Butterscotch Chocolate Bar": "Butterscotch Chocolate Bar.jpeg",
      "Exotic Chocolate Bites": "Exotic Chocolate Bites.jpg",

      "Oreo Crunch Chocolate Bar": "Oreo Crunch Chocolate Bar.jpeg",
      "Mixed Dryfruit Chocolate Bar": "Mixed Dryfruit Chocolate Bar.jpeg",
      "Soft Jelly Centered Chocolate Bar": "Soft Jelly Centered Chocolate Bar.jpeg",
      "Wafer Chocolate Bar": "Wafer Chocolate Bar.jpeg",
      "Choco Pop Lollipop": "Choco Pop Lollipop.jpeg",
      "Golden Bite Caramelised Choco": "Golden Bite Caramelised Choco.jpeg",
      "Proti Bar (Sugar Free)": "Proti Bar (Sugar Free).jpeg",
      "Puffed Quinoa & Pistachio Bars": "Puffed Quinoa & Pistachio Bars.jpeg",
      "Mango Filling": "Mango Filling.jpeg",
      "Honey Filling": "Honey Filling.jpeg",
      "Nutella Filling": "Nutella Filling.jpeg",
      "Rose Filling": "Rose Filling.jpeg"
    };

    console.log('📁 Checking for images in frontend/public/images/products/');
    const frontendImagePath = path.join(__dirname, '../frontend/public/images/products');

    if (!fs.existsSync(frontendImagePath)) {
      console.log('❌ Images directory not found. Creating it...');
      fs.mkdirSync(frontendImagePath, { recursive: true });
    }

    const availableImages = fs.readdirSync(frontendImagePath);
    console.log('Available images:', availableImages.join(', '));
    console.log('');

    let updatedCount = 0;
    let skippedCount = 0;

    // Phase 0: Normalize filenames to kebab-case for clean URLs
    function toKebabCaseFilename(fileName) {
      const ext = path.extname(fileName).toLowerCase();
      const base = path.basename(fileName, path.extname(fileName));
      const kebab = base
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .replace(/-+/g, '-');
      return `${kebab}${ext}`;
    }

    const renameMap = new Map();
    for (const fileName of availableImages) {
      const kebabName = toKebabCaseFilename(fileName);
      if (kebabName !== fileName) {
        const fromPath = path.join(frontendImagePath, fileName);
        const toPath = path.join(frontendImagePath, kebabName);
        if (!fs.existsSync(toPath)) {
          try {
            fs.renameSync(fromPath, toPath);
            console.log(`🔁 Renamed file: ${fileName} -> ${kebabName}`);
            renameMap.set(fileName, kebabName);
          } catch (e) {
            console.log(`⚠️  Failed to rename ${fileName}:`, e.message);
          }
        } else {
          // Target exists; prefer existing and note mapping
          renameMap.set(fileName, kebabName);
        }
      }
    }
    // Refresh available images after renames
    const refreshedImages = fs.readdirSync(frontendImagePath);

    for (const [productName, imageFileName] of Object.entries(imageMappings)) {
      const mappedName = renameMap.get(imageFileName) || imageFileName;
      // Determine actual file present on disk by checking common extensions
      const originalFilePath = path.join(frontendImagePath, mappedName);
      let resolvedFileName = mappedName;

      if (!fs.existsSync(originalFilePath)) {
        const ext = path.extname(mappedName).toLowerCase();
        const base = path.basename(mappedName, ext);
        const candidates = [];

        if (ext === '.jpg') {
          candidates.push(`${base}.jpeg`);
        } else if (ext === '.jpeg') {
          candidates.push(`${base}.jpg`);
        } else {
          candidates.push(`${base}.jpg`, `${base}.jpeg`);
        }

        // Try candidates in order
        const foundCandidate = candidates.find(candidate => fs.existsSync(path.join(frontendImagePath, candidate)));
        if (foundCandidate) {
          resolvedFileName = foundCandidate;
        } else {
          console.log(`⚠️  Image not found for ${productName}: ${imageFileName}`);
          continue;
        }
      }

      const imagePath = `/images/products/${resolvedFileName}`;

      // Update the product in database
      const result = await Product.updateOne(
        { name: productName },
        { $set: { image: imagePath } }
      );

      if (result.modifiedCount > 0) {
        console.log(`✅ Updated ${productName} with ${resolvedFileName}`);
        updatedCount++;
      } else if (result.matchedCount > 0) {
        console.log(`ℹ️  ${productName} already has the correct image`);
        skippedCount++;
      } else {
        console.log(`❌ Product not found: ${productName}`);
      }
    }

    // Auto-match remaining products by filename heuristics
    function normalizeName(value) {
      return String(value)
        .toLowerCase()
        .replace(/\.(jpg|jpeg|png|webp)$/g, '')
        .replace(/[^a-z0-9]+/g, ' ') // non-alphanumerics to space
        .trim()
        .replace(/\s+/g, ''); // remove all spaces
    }

    const imageFileByNormalized = new Map();
    for (const fileName of refreshedImages) {
      const base = fileName.replace(/\.(jpg|jpeg|png|webp)$/i, '');
      imageFileByNormalized.set(normalizeName(base), fileName);
    }

    const products = await Product.find({}).select('name image');
    for (const product of products) {
      const currentImage = product.image || '';
      const isPlaceholder = currentImage.includes('placeholder-chocolate');
      let needsImage = isPlaceholder || !currentImage.startsWith('/images/');

      // If it points to /images/... ensure file exists
      if (!needsImage && currentImage.startsWith('/images/products/')) {
        const fileName = currentImage.split('/').pop();
        const fullPath = path.join(frontendImagePath, fileName);
        if (!fs.existsSync(fullPath)) {
          needsImage = true;
        }
      }

      if (!needsImage) continue;

      const normalizedProductName = normalizeName(product.name);
      const matchedFile = imageFileByNormalized.get(normalizedProductName);

      // Try a contains-based fallback if exact not found
      let resolved = matchedFile;
      if (!resolved) {
        for (const [normBase, file] of imageFileByNormalized.entries()) {
          if (normBase.includes(normalizedProductName) || normalizedProductName.includes(normBase)) {
            resolved = file;
            break;
          }
        }
      }

      if (resolved) {
        const newPath = `/images/products/${resolved}`;
        const result = await Product.updateOne(
          { _id: product._id },
          { $set: { image: newPath } }
        );
        if (result.modifiedCount > 0) {
          console.log(`✅ Auto-matched ${product.name} -> ${resolved}`);
          updatedCount++;
        }
      }
    }

    console.log(`\n🎉 Update complete! ${updatedCount} products updated, ${skippedCount} already up to date.`);

    // Show current featured products
    console.log('\n📋 Current Featured Products:');
    const featuredProducts = await Product.find({ featured: true }).select('name image');
    featuredProducts.forEach(product => {
      console.log(`- ${product.name}: ${product.image}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error updating product images:', error);
    process.exit(1);
  }
}

updateProductImages();