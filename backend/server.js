// -------------------------
// Load Dependencies
// -------------------------
const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const multer = require("multer");
const errorHandler = require("./middleware/errorHandler");
const path = require("path");

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, ".env") });

// -------------------------
// Initialize App
// -------------------------
const app = express();

// -------------------------
// Middleware
// -------------------------
const allowedOrigins = [
  "http://localhost:3000",
  "https://hirentttttt.netlify.app",
];

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://hirenttttttt.netlify.app"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());
app.use(express.json());
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Connect to Database
connectDB();

// Configure multer for file uploads
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Make upload available globally
app.locals.upload = upload;

// Passport initialization
require("./config/passport");
app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set true in production with HTTPS
}));
app.use(passport.initialize());
app.use(passport.session());

// Catch malformed JSON before routes
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return next({
      statusCode: 400,
      message: "Invalid JSON format",
    });
  }
  next();
});


// -------------------------
// ROUTES
// -------------------------

// Authentication Routes
app.use("/api/auth", require("./routes/authRoutes"));

// User Routes
app.use("/api/users", require("./routes/userRoutes"));

// Owner Routes
app.use("/api/owners", require("./routes/ownerRoutes"));

// Items Routes
app.use("/api/items", require("./routes/itemRoutes"));

// Wishlist Routes
app.use("/api/wishlist", require("./routes/wishlistRoutes"));

// Location Routes
app.use("/api/locations", require("./routes/locationRoutes"));

// Home Personalized + Featured Routes
app.use("/api/home", require("./routes/homeRoutes"));
app.use("/api/homepage", require("./routes/homepageRoutes"));  // <-- FIXED PATH

// Cart Routes
app.use("/api/cart", require("./routes/cartRoutes"));

// Booking Routes
app.use("/api/bookings", require("./routes/bookingRoutes"));

// Notification Routes
app.use("/api/notifications", require("./routes/notificationRoutes"));

// Message Routes
app.use("/api/messages", require("./routes/messageRoutes"));

// User Search Routes
app.use("/api/search-users", require("./routes/userSearchRoutes"));

// Root Test Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// -------------------------
// Error Handler (must be last)
// -------------------------
app.use(errorHandler);

// -------------------------
// Start Server
// -------------------------
const PORT = process.env.PORT || 5000;
const http = require('http');
const { Server } = require("socket.io");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  // Handle joining a room
  socket.on('join', (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined their room`);
  });

  // Handle sending a message
  socket.on('message:send', ({ conversationId, senderId, receiverId, text }) => {
    // When a message is sent, emit it to the receiver's room
    io.to(receiverId).emit('message:receive', { conversationId, senderId, text });
  });

  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`\n✅ EXPRESS SERVER RUNNING on port ${PORT}`);
  console.log('📍 API available at: http://localhost:' + PORT);
  console.log('\n💡 If MongoDB not connected yet, server will retry automatically.\n');
});

// Prevent server from exiting
server.keepAliveTimeout = 65000;

// Handle server errors
server.on('error', (err) => {
  console.error('Server error:', err);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err.message);
  console.error(err.stack);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
});
