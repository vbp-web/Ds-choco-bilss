const mongoose = require('mongoose');
const path = require('path');

// Load .env when available to make local testing easier
try {
  // prefer backend/.env then repo root .env
  const backendEnv = path.resolve(__dirname, '..', '.env');
  const rootEnv = path.resolve(__dirname, '..', '..', '.env');
  // eslint-disable-next-line global-require
  require('dotenv').config({ path: backendEnv });
  require('dotenv').config({ path: rootEnv });
} catch (e) {
  // ignore - dotenv may not be installed in some CI contexts
}

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error('MONGODB_URI environment variable is not set');
  process.exit(2);
}

const run = async () => {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Successfully connected to MongoDB');
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err.message || err);
    process.exit(1);
  }
};

run();
