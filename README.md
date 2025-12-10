# HiRENT - Item Rental Marketplace

A modern full-stack rental marketplace application built with React, Node.js, Express, and MongoDB.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Environment Configuration](#environment-configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Database](#database)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Project Overview

**Hirent** is a peer-to-peer rental marketplace platform that connects renters with owners. Users can:

- **Renters**: Browse items, add to wishlist, make bookings, chat with owners
- **Owners**: List items for rent, manage bookings, track earnings, communicate with renters
- **Admins**: Manage users, categories, and platform settings

The application supports both email/password authentication and Google OAuth 2.0 login.

---

## ✨ Features

### Authentication
- ✅ Email & Password Registration
- ✅ Email & Password Login
- ✅ Google OAuth 2.0 Single Sign-On
- ✅ JWT-based session management (7-day expiry)
- ✅ Secure password hashing with bcryptjs

### User Features
- 📱 Role-based access (Renter, Owner, Admin)
- 🔍 Advanced item search and filtering
- ❤️ Wishlist management
- 📦 Shopping cart & booking system
- 💬 In-app messaging
- 📍 Location-based browsing
- 🎨 Dark/Light theme support

### Owner Features
- 📤 List items for rent
- 📊 Dashboard with analytics
- 💰 Earnings tracking
- 📅 Booking management
- 📸 Image upload (upcoming)

### Admin Features
- 👥 User management
- 📂 Category management
- 📈 Platform analytics
- ⚙️ System settings

---

## 🛠 Tech Stack

### Frontend
- **Framework**: React 18+
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **State Management**: Context API
- **Icons**: Lucide React
- **Animation**: Framer Motion
- **Maps**: Leaflet

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas (Cloud)
- **ODM**: Mongoose
- **Authentication**: Passport.js, JWT
- **Security**: bcryptjs (password hashing)

### DevOps
- **Version Control**: Git
- **Environment**: .env configuration
- **Port Management**: 5000 (Backend), 3000 (Frontend)

---

## 📁 Project Structure

```
hirent/
├── backend/
│   ├── config/
│   │   └── passport.js           # Google OAuth configuration
│   ├── controllers/
│   │   ├── authController.js     # Auth logic (register, login, Google)
│   │   ├── userController.js
│   │   ├── itemController.js
│   │   ├── bookingController.js
│   │   └── ...
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT verification
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── Users.js              # User schema
│   │   ├── Item.js
│   │   ├── Category.js
│   │   └── ...
│   ├── routes/
│   │   ├── authRoutes.js         # Auth endpoints
│   │   ├── userRoutes.js
│   │   └── ...
│   ├── .env                       # Environment variables
│   ├── server.js                  # Main server file
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── forms/
│   │   │   │   └── AuthForm.jsx  # Login/Signup form
│   │   │   ├── layouts/
│   │   │   │   ├── Navbar.jsx    # User navbar (shows user name)
│   │   │   │   ├── MainNav.jsx   # Guest navbar
│   │   │   │   └── MainLayout.jsx
│   │   │   ├── home/
│   │   │   └── ...
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   │   ├── Signup.jsx
│   │   │   │   ├── Login.jsx
│   │   │   │   └── GoogleCallback.jsx  # OAuth callback handler
│   │   │   ├── owner/
│   │   │   ├── admin/
│   │   │   └── ...
│   │   ├── context/
│   │   │   └── AuthContext.jsx   # Global auth state
│   │   ├── App.js                # Routes configuration
│   │   └── index.js
│   ├── .env.local
│   └── package.json
│
├── README.md                      # This file
└── AUTH_FIXED_GUIDE.md           # Authentication guide
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js 14+ and npm
- MongoDB Atlas account
- Google OAuth 2.0 credentials
- Git

### Step 1: Clone Repository
```bash
git clone https://github.com/lougenlou/Hirent.git
cd Hirent
```

### Step 2: Backend Setup
```bash
cd backend
npm install
```

### Step 3: Frontend Setup
```bash
cd ../frontend
npm install
```

---

## ⚙️ Environment Configuration

### Backend `.backend/.env`
```dotenv
# MongoDB
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/hirent?retryWrites=true&w=majority&authSource=admin

# JWT
JWT_SECRET=your-secret-key-here

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=http://localhost:5000/api/auth/google/callback

# Server
PORT=5000
```

### Frontend `.frontend/.env.local`
```dotenv
REACT_APP_API_URL=http://localhost:5000
```

---

## ▶️ Running the Application

### Start Backend Server
```bash
cd backend
npm start
# or
node server.js
```

**Expected Output:**
```
🔄 Connecting to MongoDB Atlas...
✅ EXPRESS SERVER RUNNING on port 5000
✅ MongoDB connected successfully!
   Database: hirent
```

### Start Frontend Development Server
```bash
cd frontend
npm start
```

**Expected Output:**
```
webpack compiled successfully

You can now view frontend in the browser.

Local:            http://localhost:3000
```

### Open in Browser
Navigate to: **http://localhost:3000**

---

## 🔌 API Endpoints

### Authentication

#### Register (Email)
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Test@123"
}

Response:
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "ObjectId",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "renter",
    "authProvider": "email"
  },
  "message": "Registration successful"
}
```

#### Login (Email)
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "Test@123"
}

Response:
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { ... },
  "message": "Login successful"
}
```

#### Google OAuth
```http
GET /api/auth/google
# Redirects to Google OAuth consent screen

# Callback
GET /api/auth/google/callback
# Redirects to frontend: /auth-callback?token=...&user=...
```

---

## 🔐 Authentication Flow

### Email/Password Registration
1. User fills signup form (name, email, password)
2. Frontend validates input
3. POST to `/api/auth/register`
4. Backend hashes password (bcryptjs)
5. User saved to MongoDB
6. JWT token generated (7-day expiry)
7. Token + user data stored in localStorage
8. AuthContext updated
9. Redirect to home page (/)
10. Navbar displays user's full name

### Email/Password Login
1. User enters email and password
2. POST to `/api/auth/login`
3. Backend verifies credentials
4. Password compared with hash (bcrypt)
5. JWT token generated
6. Token stored in localStorage
7. Redirect to home page (/)

### Google OAuth
1. User clicks "Continue with Google"
2. Redirected to: `/api/auth/google`
3. Google OAuth consent screen appears
4. User authorizes HiRENT
5. Google redirects to callback with auth code
6. Backend exchanges code for user profile
7. Backend creates/links user account
8. JWT token generated
9. Redirects to `/auth-callback?token=...&user=...`
10. Frontend GoogleCallback component processes token
11. Stores in localStorage and AuthContext
12. Redirects to home page (/)
13. Navbar shows Google account name

---

## 💾 Database

### MongoDB Schema: Users
```javascript
{
  _id: ObjectId,
  name: String,              // User's full name
  email: String,             // Unique email
  password: String,          // bcrypt hash (optional for Google)
  googleId: String,          // Google ID (optional)
  avatar: String,            // Profile picture URL
  role: String,              // "renter" | "owner" | "admin"
  authProvider: String,      // "email" | "google"
  createdAt: Date,
  updatedAt: Date
}
```

### Connecting to MongoDB Atlas
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create/Select cluster
3. Go to **Network Access**
4. Add IP: `0.0.0.0/0` (allow all for development)
5. Go to **Database Access**
6. Create user with credentials
7. Copy connection string to `.env`

---

## 🧪 Testing

### Test Registration via Terminal
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "Test@123"
  }'
```

### Test Login via Terminal
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test@123"
  }'
```

### Test in Browser
1. Open http://localhost:3000
2. Click "Signup"
3. Fill form and register
4. Should redirect to home with user name in navbar
5. Click "Logout"
6. Click "Login"
7. Enter credentials
8. Should redirect to home

### Test Google OAuth
1. On signup/login page
2. Click "Continue with Google"
3. Complete Google authentication
4. Should redirect to home with Google account name in navbar

---

## ❌ Troubleshooting

### MongoDB Connection Failed
```
❌ MongoDB Connection Failed:
   Error: Could not connect to any servers in your MongoDB Atlas cluster
```

**Solutions:**
1. Verify MONGO_URI in `.env` is correct
2. Check IP whitelist in MongoDB Atlas (add `0.0.0.0/0`)
3. Ensure MongoDB Atlas cluster is running (not paused)
4. Wait 2-5 minutes after making whitelist changes

### Registration/Login Returns 500 Error
```
POST http://localhost:5000/api/auth/register 500 (Internal Server Error)
```

**Solutions:**
1. Check backend console for error message
2. Verify MongoDB is connected (check logs)
3. Verify User model is properly imported
4. Check if email already exists (for signup)

### Google OAuth Not Working
```
Error: CORS policy blocked request
or
Error: Redirect URI mismatch
```

**Solutions:**
1. Verify `GOOGLE_REDIRECT_URI=http://localhost:5000/api/auth/google/callback`
2. Add same URL to Google OAuth authorized redirect URIs
3. Check browser console for CORS errors
4. Clear browser cookies and try again

### Frontend Won't Compile
```
ERROR in [eslint] src/components/...
  'variable' is not defined
```

**Solution:**
```bash
cd frontend
npm start
# Let webpack auto-reload, should compile after file save
```

---

## 📝 User Data Display

### Navbar Shows User Name
The navbar component reads from `AuthContext.user.name` and displays:
```
Hi, [User Full Name]! | Logout
```

Example:
- Email signup: `Hi, John Doe! | Logout`
- Google login: `Hi, Jane Smith! | Logout`

---

## 🔄 Future Enhancements

- [ ] Email verification
- [ ] Password reset functionality
- [ ] Two-factor authentication (2FA)
- [ ] Image upload with Cloudinary
- [ ] Payment integration (Stripe/PayPal)
- [ ] Real-time chat with Socket.io
- [ ] Video verification for owners
- [ ] Advanced filtering and search
- [ ] Review and rating system
- [ ] Insurance/protection plans

---

## 📞 Support

For issues or questions:
1. Check the [Troubleshooting](#troubleshooting) section
2. Check backend console logs
3. Check browser console (F12)
4. Check MongoDB Atlas status
5. Open an issue on GitHub

---

## 📄 License

MIT License - See LICENSE file for details

---

## 👥 Contributors

- **Project**: Hirent

---

**Last Updated**: December 8, 2025  
**Status**: ✅ Authentication System Complete - Ready for Testing
