const express = require("express");
const router = express.Router();
const passport = require("passport");
const { registerUser, loginUser, googleAuth, updateProfile } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

// Google OAuth
router.get("/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/google/callback",
  passport.authenticate("google", { session: false }),
  googleAuth
);

// Standard Auth
router.post("/register", registerUser);
router.post("/login", loginUser);

// Profile management (requires authentication)
router.put("/profile", authMiddleware, updateProfile);

module.exports = router;
