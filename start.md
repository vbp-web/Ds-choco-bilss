# Deployment Instructions

## Frontend (GitHub Pages)
1. In `frontend/package.json`, add:
   "homepage": "https://<your-username>.github.io/<repo-name>"
2. In `frontend/`, run:
   npm install --save gh-pages
3. In `frontend/package.json`, add these scripts:
   "predeploy": "npm run build",
   "deploy": "gh-pages -d build"
4. In `frontend/`, run:
   npm run deploy

## Backend (Vercel)
1. Go to https://vercel.com/ and import your repo.
2. Set the project root to `backend`.
3. Set up environment variables (e.g., MongoDB URI) in the Vercel dashboard.
4. Deploy the backend.

## Update API URLs
- In your frontend code, update all API URLs to use your deployed Vercel backend URL (e.g., `https://your-backend.vercel.app/api/...`).

# Existing Local Usage
for database conn : cd backend
                    npm run seed

 image   : cd backend
            node update-product-images.js

            site : npm run dev