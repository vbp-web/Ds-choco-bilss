const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🍫 Setting up D\'s Choco Bliss...\n');

// Check if Node.js is installed
try {
  const nodeVersion = execSync('node --version', { encoding: 'utf8' });
  console.log(`✅ Node.js version: ${nodeVersion.trim()}`);
} catch (error) {
  console.error('❌ Node.js is not installed. Please install Node.js first.');
  process.exit(1);
}

// Create .env file for backend if it doesn't exist
const envPath = path.join(__dirname, 'backend', '.env');
if (!fs.existsSync(envPath)) {
  const envContent = `MONGODB_URI=mongodb://localhost:27017/ds-choco-bliss
PORT=5000
NODE_ENV=development
`;
  fs.writeFileSync(envPath, envContent);
  console.log('✅ Created backend/.env file');
}

// Install dependencies
console.log('\n📦 Installing dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Root dependencies installed');
  
  execSync('cd backend && npm install', { stdio: 'inherit' });
  console.log('✅ Backend dependencies installed');
  
  execSync('cd frontend && npm install', { stdio: 'inherit' });
  console.log('✅ Frontend dependencies installed');
} catch (error) {
  console.error('❌ Error installing dependencies:', error.message);
  process.exit(1);
}

console.log('\n🎉 Setup completed successfully!');
console.log('\n📋 Next steps:');
console.log('1. Make sure MongoDB is running on your system');
console.log('2. Run "npm run seed" to populate the database with products');
console.log('3. Run "npm run dev" to start both frontend and backend servers');
console.log('4. Visit http://localhost:3000 to see your chocolate store!');
console.log('5. Visit http://localhost:3000/admin for the admin dashboard');
console.log('\n🍫 Happy chocolate selling!');










