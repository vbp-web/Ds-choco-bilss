# 🍫 MongoDB Setup Guide for D's Choco Bliss

## Quick Setup with MongoDB Atlas (Recommended)

### Step 1: Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/atlas
2. Sign up for a free account
3. Create a new project called "D's Choco Bliss"

### Step 2: Create a Free Cluster
1. Click "Build a Database"
2. Choose "FREE" tier (M0 Sandbox)
3. Select a region close to you
4. Name your cluster "choco-bliss-cluster"
5. Click "Create"

### Step 3: Set Up Database Access
1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Username: `choco-admin`
5. Password: Create a strong password (save this!)
6. Database User Privileges: "Read and write to any database"
7. Click "Add User"

### Step 4: Set Up Network Access
1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

### Step 5: Get Connection String
1. Go to "Database" in the left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Driver: "Node.js"
5. Version: "4.1 or later"
6. Copy the connection string

### Step 6: Update Your Environment
1. Open `backend/.env` file
2. Replace the MONGODB_URI with your Atlas connection string:

```env
MONGODB_URI=mongodb+srv://choco-admin:<password>@choco-bliss-cluster.xxxxx.mongodb.net/ds-choco-bliss?retryWrites=true&w=majority
```

Replace `<password>` with your actual password and `xxxxx` with your cluster details.

### Step 7: Test the Connection
Run these commands:

```bash
# From the backend directory
cd backend
npm run seed
```

If successful, you should see:
```
Connecting to MongoDB...
Connected to MongoDB
Cleared existing products
Seeded 60 products successfully
```

## Alternative: Local MongoDB Setup

If you prefer to run MongoDB locally:

### Windows:
1. Download MongoDB Community Server from https://www.mongodb.com/try/download/community
2. Install it
3. Start MongoDB service from Windows Services
4. Run `npm run seed` from the backend directory

### macOS:
```bash
# Install with Homebrew
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb/brew/mongodb-community

# Then run
npm run seed
```

### Linux:
```bash
# Install MongoDB
sudo apt-get install mongodb
sudo systemctl start mongod

# Then run
npm run seed
```

## Troubleshooting

### Connection Issues:
- Make sure your MongoDB Atlas cluster is running
- Check that your IP is whitelisted in Network Access
- Verify your username and password are correct
- Ensure the database name is correct

### Still Having Issues?
1. Check the connection string format
2. Make sure you replaced `<password>` with your actual password
3. Verify the cluster is not paused (Atlas free tier pauses after inactivity)

Once MongoDB is connected, your products will appear on the website! 🍫










