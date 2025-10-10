# Authentication System Guide

## Overview

This guide explains the complete authentication system implemented for D's Choco Bliss e-commerce platform, including user registration, login, JWT-based authentication, and profile management.

## Features Implemented

### Backend Features
- ✅ User registration with validation
- ✅ Secure password hashing using bcryptjs
- ✅ JWT token-based authentication
- ✅ User login with email and password
- ✅ Protected routes with middleware
- ✅ User profile management
- ✅ Password change functionality
- ✅ Role-based access control (user/admin)
- ✅ MongoDB integration for data storage

### Frontend Features
- ✅ Login and signup forms with validation
- ✅ Authentication context for state management
- ✅ Protected routes and user sessions
- ✅ User profile page with edit functionality
- ✅ Responsive authentication UI
- ✅ Integration with existing navbar
- ✅ Error handling and user feedback

## API Endpoints

### Authentication Routes (`/api/auth`)

#### POST `/api/auth/signup`
Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "9876543210",
  "address": {
    "street": "123 Main St",
    "city": "Mumbai",
    "state": "Maharashtra",
    "zipCode": "400001"
  }
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "phone": "9876543210",
    "address": { ... },
    "createdAt": "2023-..."
  }
}
```

#### POST `/api/auth/login`
Login with email and password.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "jwt-token-here",
  "user": { ... }
}
```

#### GET `/api/auth/profile` (Protected)
Get current user profile.

**Headers:**
```
Authorization: Bearer jwt-token-here
```

**Response:**
```json
{
  "user": { ... }
}
```

#### PUT `/api/auth/profile` (Protected)
Update user profile.

**Headers:**
```
Authorization: Bearer jwt-token-here
```

**Request Body:**
```json
{
  "name": "Updated Name",
  "phone": "9876543211",
  "address": { ... }
}
```

#### POST `/api/auth/change-password` (Protected)
Change user password.

**Headers:**
```
Authorization: Bearer jwt-token-here
```

**Request Body:**
```json
{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword123"
}
```

#### POST `/api/auth/logout` (Protected)
Logout user (client-side token removal).

## Database Schema

### User Model
```javascript
{
  name: String (required, 2-50 chars),
  email: String (required, unique, valid email),
  password: String (required, min 6 chars, hashed),
  role: String (enum: ['user', 'admin'], default: 'user'),
  phone: String (optional, 10 digits),
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String (default: 'India')
  },
  isVerified: Boolean (default: true),
  createdAt: Date,
  lastLogin: Date
}
```

## Frontend Implementation

### Authentication Context
The `AuthContext` provides:
- User state management
- Login/logout functions
- Token management
- Profile update functions
- Authentication status

### Components
- `LoginForm`: User login interface
- `SignupForm`: User registration interface
- `AuthModal`: Modal container for auth forms
- `ProfilePage`: User profile management

### Usage Example
```jsx
import { useAuth } from './context/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  if (isAuthenticated) {
    return <div>Welcome, {user.name}!</div>;
  }
  
  return <button onClick={() => login(email, password)}>Login</button>;
}
```

## Security Features

### Password Security
- Passwords are hashed using bcryptjs with salt rounds of 12
- Plain text passwords are never stored
- Password validation on both client and server

### JWT Security
- Tokens expire after 7 days
- Tokens are stored in localStorage (consider httpOnly cookies for production)
- Invalid/expired tokens are properly handled

### Input Validation
- Server-side validation using express-validator
- Client-side validation for better UX
- SQL injection and XSS protection

### Role-Based Access
- Admin and user roles supported
- Middleware for role-based route protection
- Admin panel access control

## Environment Variables

Add these to your `.env` file:

```env
# JWT Secret (change in production)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/ds-choco-bliss

# Server Port
PORT=5000
```

## Getting Started

### 1. Backend Setup
```bash
cd backend
npm install
npm start
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm start
```

### 3. Test the System
- Visit `http://localhost:3000`
- Click "Sign In" button in navbar
- Create a new account or login
- Access your profile from the user menu

## Testing

The authentication system has been thoroughly tested:
- ✅ User registration works
- ✅ User login works
- ✅ JWT token authentication works
- ✅ Protected routes work
- ✅ Profile updates work
- ✅ Invalid tokens are rejected
- ✅ Database connection and data storage works

## Production Considerations

### Security Enhancements
1. Use httpOnly cookies instead of localStorage for tokens
2. Implement refresh tokens
3. Add rate limiting for auth endpoints
4. Use HTTPS in production
5. Implement email verification
6. Add password reset functionality

### Performance
1. Add Redis for session management
2. Implement token blacklisting
3. Add database indexing for email field

### Monitoring
1. Add authentication logging
2. Monitor failed login attempts
3. Track user activity

## Troubleshooting

### Common Issues

1. **"Network error" on login/signup**
   - Check if backend server is running on port 5000
   - Verify CORS configuration

2. **"Invalid token" errors**
   - Check if JWT_SECRET is set correctly
   - Verify token format in Authorization header

3. **Database connection issues**
   - Ensure MongoDB is running
   - Check MONGODB_URI in environment variables

4. **Frontend not connecting to backend**
   - Verify proxy setting in frontend package.json
   - Check API_BASE_URL in AuthContext

## File Structure

```
backend/
├── models/
│   └── User.js              # User database model
├── routes/
│   └── auth.js              # Authentication routes
├── middleware/
│   └── auth.js              # JWT middleware
└── server.js                # Updated with auth routes

frontend/
├── src/
│   ├── context/
│   │   └── AuthContext.js   # Authentication state management
│   ├── components/
│   │   └── Auth/
│   │       ├── LoginForm.js
│   │       ├── SignupForm.js
│   │       └── AuthModal.js
│   ├── pages/
│   │   └── ProfilePage.js   # User profile management
│   └── App.js               # Updated with AuthProvider
```

## Support

For issues or questions about the authentication system, please check:
1. This documentation
2. Console errors in browser/server
3. Network tab for API request details
4. MongoDB logs for database issues

The authentication system is now fully functional and ready for use!
