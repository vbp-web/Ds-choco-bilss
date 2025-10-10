# 🖼️ Product Image Update Guide

## Method 1: Using Scripts (Recommended for Bulk Updates)

### Step 1: Prepare Your Images
1. **Create/collect your product images** in JPG, PNG, or WebP format
2. **Name your images** using this convention: `product-name.jpg`
   - Example: `pista-kunafa.jpg`, `biscoff-kunafa.jpg`

### Step 2: Add Images to Frontend
```bash
# Copy your images to the frontend public folder
cp "your-image.jpg" "frontend/public/images/products/"
```

### Step 3: Update Image Mappings
Edit `backend/update-product-images.js` and update the `imageMappings` object:

```javascript
const imageMappings = {
  "Pista Kunafa": "pista-kunafa.jpg",
  "Biscoff Kunafa": "biscoff-kunafa.jpg", 
  "Plain Dark Chocolate Bar": "dark-chocolate.jpg",
  // Add more mappings here
};
```

### Step 4: Run the Update Script
```bash
cd backend
node update-product-images.js
```

## Method 2: Using Admin API (For Individual Updates)

### Step 1: Upload Image via API
```bash
# Using curl to upload an image
curl -X PUT -F "image=@your-image.jpg" http://localhost:5000/api/admin/products/PRODUCT_ID/image
```

### Step 2: Get Product ID First
```bash
# Get all products to find the ID
curl http://localhost:5000/api/admin/products
```

## Method 3: Direct Database Update

### Step 1: Create Update Script
Create a file `backend/update-single-image.js`:

```javascript
const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

async function updateImage() {
  await mongoose.connect(process.env.MONGODB_URI);
  
  await Product.updateOne(
    { name: "Product Name" }, // Replace with actual product name
    { $set: { image: "/images/products/your-image.jpg" } }
  );
  
  console.log('Image updated!');
  process.exit(0);
}

updateImage();
```

### Step 2: Run the Script
```bash
cd backend
node update-single-image.js
```

## Method 4: Manual Process (Step by Step)

### Step 1: Add Image File
```bash
# Copy your image to frontend public folder
cp "D:\path\to\your\image.jpg" "frontend/public/images/products/product-name.jpg"
```

### Step 2: Update Database
```bash
# Connect to MongoDB and update
mongosh "mongodb+srv://your-connection-string"

# In MongoDB shell:
use ds-choco-bliss
db.products.updateOne(
  { name: "Pista Kunafa" },
  { $set: { image: "/images/products/pista-kunafa.jpg" } }
)
```

## 📁 File Structure

```
frontend/
├── public/
│   └── images/
│       └── products/
│           ├── pista-kunafa.jpg
│           ├── biscoff-kunafa.jpg
│           ├── dark-chocolate.jpg
│           └── ...
backend/
├── scripts/
│   ├── seedDatabase.js
│   └── update-product-images.js
└── routes/
    └── admin.js
```

## 🎯 Quick Commands

### Update All Images at Once:
```bash
cd backend
node update-product-images.js
```

### Update Single Product:
```bash
# Method 1: Using script
node update-single-image.js

# Method 2: Using API
curl -X PUT -F "image=@image.jpg" http://localhost:5000/api/admin/products/PRODUCT_ID/image
```

### Check Current Images:
```bash
curl http://localhost:5000/api/admin/products
```

## ⚠️ Important Notes

1. **Image Formats**: Use JPG, PNG, or WebP for best compatibility
2. **File Size**: Keep images under 5MB for better performance
3. **Naming**: Use lowercase, hyphen-separated names (e.g., `pista-kunafa.jpg`)
4. **Path**: Always use `/images/products/filename.jpg` in database
5. **Backup**: Always backup your database before bulk updates

## 🔧 Troubleshooting

### Image Not Displaying?
1. Check if file exists in `frontend/public/images/products/`
2. Verify the path in database starts with `/images/products/`
3. Clear browser cache and refresh
4. Check browser console for 404 errors

### Database Connection Issues?
1. Verify `.env` file has correct MongoDB URI
2. Check if MongoDB Atlas allows your IP address
3. Ensure database user has read/write permissions

### Script Errors?
1. Make sure all dependencies are installed: `npm install`
2. Check if MongoDB is connected: `npm run dev`
3. Verify product names match exactly in database

## 📞 Support

If you need help updating images, run:
```bash
cd backend
node update-product-images.js
```

This will show you available images and current product status.



