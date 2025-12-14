# Hirent

A full-stack peer-to-peer rental marketplace application built with React, Node.js, Express, and MongoDB.

---

## **Project Overview**

Hirent is a rental marketplace platform that connects renters with owners. The application supports three user roles:

- **Renters**: Browse items, manage wishlist, create bookings, communicate with owners
- **Owners**: List items for rent, manage bookings, track earnings, view analytics
- **Admins**: Manage users, categories, and platform settings

The platform supports email/password authentication and Google OAuth 2.0 login.

---

## **User Roles**

| Role | Capabilities |
|------|---|
| Renter | Browse items, search, filter, wishlist, bookings, messaging |
| Owner | List items, manage bookings, view dashboard, track earnings |
| Admin | User management, category management, platform analytics |

---

## **Tech Stack**

**Frontend**
- React 18+
- Tailwind CSS
- React Router v6
- Context API
- Lucide React Icons

**Backend**
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose ODM
- Passport.js & JWT
- bcryptjs

**Infrastructure**
- Git version control
- .env configuration
- Port 5000 (Backend), 3000 (Frontend)

---

## **Project Structure**

```
hirent/
├── backend/
│   ├── config/
│   │   └── passport.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── itemController.js
│   │   ├── bookingController.js
│   │   └── ...
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Item.js
│   │   ├── Booking.js
│   │   └── ...
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── itemRoutes.js
│   │   └── ...
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── config/
│   │   ├── App.js
│   │   └── index.js
│   ├── .env.local
│   └── package.json
│
└── README.md
```

---

## **Installation**

### Prerequisites
- Node.js 14+ and npm
- MongoDB Atlas account
- Google OAuth 2.0 credentials

### Setup Steps

**1. Clone Repository**
```bash
git clone https://github.com/lougenlou/Hirent.git
cd Hirent
```

**2. Backend Installation**
```bash
cd backend
npm install
```

**3. Frontend Installation**
```bash
cd ../frontend
npm install
```

---

## **Environment Setup**

### Backend Configuration (`.env`)
```dotenv
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/hirent?retryWrites=true&w=majority&authSource=admin
JWT_SECRET=your-secret-key-here
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=http://localhost:5000/api/auth/google/callback
PORT=5000
```

### Frontend Configuration (`.env.local`)
```dotenv
REACT_APP_API_URL=http://localhost:5000
```

---

## **Running the Application**

### Start Backend
```bash
cd backend
npm start
```

Expected output:
```
✅ MongoDB connected successfully!
✅ EXPRESS SERVER RUNNING on port 5000
```

### Start Frontend
```bash
cd frontend
npm start
```

Expected output:
```
webpack compiled successfully
Local: http://localhost:3000
```

### Access Application
Open browser and navigate to: **http://localhost:3000**

---

## **License**

MIT License - See LICENSE file for details

---

**Last Updated**: December 14, 2025
