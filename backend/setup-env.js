const fs = require('fs');
const path = require('path');

console.log('🔧 MongoDB Atlas Setup Helper\n');

// Pre-configured MongoDB Atlas connection
const mongoUri = 

console.log('Using pre-configured MongoDB Atlas connection...');
console.log('Cluster: cluster0.0wlc9sc.mongodb.net');
console.log('Database: ds-choco-bliss\n');

const envContent = `# MongoDB Atlas Connection
MONGODB_URI=${mongoUri}

# Server Configuration
PORT=5000
NODE_ENV=development

# Razorpay Keys (set your real keys in production)
RAZORPAY_KEY_ID=rzp_test_xxx
RAZORPAY_KEY_SECRET=xxx
`;

fs.writeFileSync(path.join(__dirname, '.env'), envContent);
console.log('✅ .env file created successfully!');
console.log('📝 Your MongoDB Atlas connection string has been saved.');
console.log('🚀 You can now run: npm run seed');
