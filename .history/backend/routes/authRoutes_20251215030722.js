const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");
const { 
  registerUser, 
  loginUser, 
  googleAuth, 
  updateProfile,
  sendOwnerVerificationEmailEndpoint,
  verifyOwnerEmail
} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

// -------------------------------------
// Multer for avatar uploads
// -------------------------------------
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

// =====================================
// GOOGLE AUTH ROUTES
// =====================================

// Step 1 — Start Google Login (renter)
router.get("/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Step 1 — Start Google Login (owner signup)
router.get("/google/owner",
  passport.authenticate("google", { scope: ["profile", "email"], state: "owner" })
);

// Step 2 — Google CALLBACK ROUTE (Render backend)
// After success → redirect to Netlify frontend with token
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {

    // googleAuth returns: { token, user, isNew }
    googleAuth(req, res, (data) => {

      const frontendURL = process.env.FRONTEND_URL;

      // Successful login redirect:
      return res.redirect(
        `${frontendURL}/auth/google/success?token=${data.token}`
      );
    });
  }
);

// =====================================
// STANDARD AUTH
// =====================================
router.post("/register", registerUser);
router.post("/login", loginUser);

// =====================================
// PROFILE
// =====================================
router.put("/profile", authMiddleware, upload.single("avatar"), updateProfile);

// =====================================
// OWNER EMAIL VERIFICATION
// =====================================
router.post("/send-verification-email", authMiddleware, sendOwnerVerificationEmailEndpoint);
router.post("/verify-email", verifyOwnerEmail);

module.exports = router;
