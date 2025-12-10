const express = require("express");
const router = express.Router();
const passport = require("passport");
const { registerUser, loginUser, googleAuth, updateProfile } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

// Google OAuth - Standard (renter) flow
router.get("/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth - Owner signup flow
router.get("/google/owner",
  passport.authenticate("google", { scope: ["profile", "email"], state: "owner" })
);

// Google OAuth callback (handles both renter and owner flows)
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
