# 🍫 Quick Start Guide - D's Choco Bliss

## Prerequisites
- Node.js (v14 or higher) - [Download here](https://nodejs.org/)
- MongoDB - [Download here](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/atlas)

## 🚀 Quick Setup (3 Steps)

### 1. Install Dependencies
```bash
node setup.js
```
This will automatically install all dependencies for both frontend and backend.

### 2. Start MongoDB
Make sure MongoDB is running on your system:
```bash
# For local MongoDB
mongod

# Or if you're using MongoDB Atlas, just make sure your connection string is correct
```

### 3. Seed Database & Start Servers
```bash
# Seed the database with all chocolate products
npm run seed

# Start both frontend and backend servers
npm run dev
```

## 🌐 Access Your Store

- **Customer Store**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3000/admin
- **API Endpoint**: http://localhost:5000

## 📱 Test the Features

### Customer Flow:
1. Visit the homepage and browse featured products
2. Go to Products page and filter by categories
3. Click on any product to see size options and pricing
4. Add items to cart with different quantities
5. Proceed to checkout and fill in your details
6. Place an order and see the success page

### Admin Flow:
1. Visit `/admin` to see the admin dashboard
2. View order statistics and recent orders
3. Update order status (pending → confirmed → preparing → ready → delivered)
4. Click "View" to see detailed order information

## 🛠 Available Scripts

```bash
# Development
npm run dev          # Start both frontend and backend
npm run client       # Start only frontend
npm run server       # Start only backend

# Database
npm run seed         # Populate database with products

# Production
npm run build        # Build frontend for production
npm start           # Start production server
```

## 🎨 Customization

### Colors & Branding
Edit `frontend/tailwind.config.js` to change the color scheme:
```javascript
colors: {
  'chocolate': { /* your colors */ },
  'cream': { /* your colors */ },
  'gold': { /* your colors */ }
}
```

### Business Information
Update contact details in:
- `frontend/src/components/Layout/Footer.js`
- `frontend/src/components/Layout/Navbar.js`
- `frontend/src/components/Home/HeroSection.js`

### Products
All products are stored in the database. To add/modify products:
1. Use the admin panel (future enhancement)
2. Or edit `backend/scripts/seedDatabase.js` and re-run `npm run seed`

## 🚀 Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Backend (Heroku)
1. Create Heroku app
2. Add MongoDB Atlas connection string
3. Deploy

## 🆘 Troubleshooting

### Common Issues:

**Port already in use:**
```bash
# Kill process on port 3000 or 5000
npx kill-port 3000
npx kill-port 5000
```

**MongoDB connection error:**
- Make sure MongoDB is running
- Check your connection string in `backend/.env`

**Build errors:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm run install-all
```

## 📞 Support

- **Phone**: +91 90239 74421
- **Instagram**: [@D_CHOCO_BLISS](https://instagram.com/D_CHOCO_BLISS)

---

**Enjoy your chocolate store! 🍫✨**










