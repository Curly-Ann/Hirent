// =============================================
// USER VALIDATORS (Register, Login, Profile)
// =============================================

const { body } = require("express-validator");

// REGISTER VALIDATOR
const registerValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .matches(/[0-9]/)
    .withMessage("Password must include at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("Password must include at least one special character"),

  body("role")
    .optional()
    .isIn(["renter", "owner", "admin"])
    .withMessage("Role must be renter, owner, or admin"),
];

// LOGIN VALIDATOR
const loginValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

// UPDATE PROFILE VALIDATOR - All fields are optional and only validated if provided with non-empty value
const updateProfileValidator = [
  body("*").trim(), // Trim all string fields
  
  // Personal Information - only validate if provided
  body("firstName").optional({ checkFalsy: true }).isLength({ min: 2, max: 50 }).withMessage("First name must be between 2 and 50 characters"),
  body("lastName").optional({ checkFalsy: true }).isLength({ min: 2, max: 50 }).withMessage("Last name must be between 2 and 50 characters"),
  body("email").optional({ checkFalsy: true }).isEmail().withMessage("Invalid email format").normalizeEmail(),
  body("phone").optional({ checkFalsy: true }).isLength({ min: 5, max: 20 }).withMessage("Phone number must be between 5 and 20 characters"),
  body("address").optional({ checkFalsy: true }).isLength({ max: 200 }).withMessage("Address must not exceed 200 characters"),
  body("city").optional({ checkFalsy: true }).isLength({ min: 2, max: 50 }).withMessage("City must be between 2 and 50 characters"),
  body("zipCode").optional({ checkFalsy: true }).isLength({ min: 4, max: 10 }).withMessage("ZIP code must be between 4 and 10 characters"),
  body("country").optional({ checkFalsy: true }).isLength({ min: 2, max: 50 }).withMessage("Country must be between 2 and 50 characters"),

  // Business Information
  body("businessName").optional({ checkFalsy: true }).isLength({ min: 2, max: 100 }).withMessage("Business name must be between 2 and 100 characters"),
  body("businessType").optional({ checkFalsy: true }).isIn(["Individual", "Sole Proprietorship", "Corporation", "Partnership"]).withMessage("Business type must be Individual, Sole Proprietorship, Corporation, or Partnership"),
  body("taxId").optional({ checkFalsy: true }).matches(/^\d{3}-\d{3}-\d{3}-\d{3}$|^\d{9}$/).withMessage("Tax ID must be in format XXX-XXX-XXX-XXX or 9 digits"),

  // Bank Information
  body("bankName").optional({ checkFalsy: true }).isLength({ min: 2, max: 100 }).withMessage("Bank name must be between 2 and 100 characters"),
  body("accountNumber").optional({ checkFalsy: true }).matches(/^[0-9]{5,30}$/).withMessage("Account number must be numeric and between 5 and 30 digits"),
  body("accountName").optional({ checkFalsy: true }).isLength({ min: 2, max: 100 }).withMessage("Account name must be between 2 and 100 characters"),

  // E-Wallet Information
  body("ewalletProvider").optional({ checkFalsy: true }).isIn(["GCash", "Maya", "PayPal"]).withMessage("E-wallet provider must be GCash, Maya, or PayPal"),
  body("ewalletNumber").optional({ checkFalsy: true }).isLength({ min: 5, max: 20 }).withMessage("E-wallet number must be between 5 and 20 characters"),
  body("ewalletName").optional({ checkFalsy: true }).isLength({ min: 2, max: 100 }).withMessage("E-wallet account name must be between 2 and 100 characters"),

  // Owner Setup Fields
  body("sellerType").optional({ checkFalsy: true }).isIn(["individual", "business"]).withMessage("Seller type must be individual or business"),
  body("ownerAddress").optional({ checkFalsy: true }).isLength({ max: 200 }).withMessage("Owner address must not exceed 200 characters"),
  body("pickupAddress").optional({ checkFalsy: true }).isLength({ max: 200 }).withMessage("Pickup address must not exceed 200 characters"),
  body("region").optional({ checkFalsy: true }).isLength({ min: 2, max: 50 }).withMessage("Region must be between 2 and 50 characters"),
  body("regionName").optional({ checkFalsy: true }).isLength({ min: 2, max: 50 }).withMessage("Region name must be between 2 and 50 characters"),
  body("province").optional({ checkFalsy: true }).isLength({ min: 2, max: 50 }).withMessage("Province must be between 2 and 50 characters"),
  body("provinceName").optional({ checkFalsy: true }).isLength({ min: 2, max: 50 }).withMessage("Province name must be between 2 and 50 characters"),
  body("barangay").optional({ checkFalsy: true }).isLength({ min: 2, max: 50 }).withMessage("Barangay must be between 2 and 50 characters"),
  body("postalCode").optional({ checkFalsy: true }).isLength({ min: 4, max: 10 }).withMessage("Postal code must be between 4 and 10 characters"),
];

// UPDATE PASSWORD VALIDATOR
const updatePasswordValidator = [
  body("currentPassword")
    .notEmpty()
    .withMessage("Current password is required"),

  body("newPassword")
    .notEmpty()
    .withMessage("New password is required")
    .isLength({ min: 6 })
    .withMessage("New password must be at least 6 characters")
    .matches(/[0-9]/)
    .withMessage("New password must include at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("New password must include at least one special character"),

  body("confirmPassword")
    .notEmpty()
    .withMessage("Confirm password is required")
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
];

module.exports = {
  registerValidator,
  loginValidator,
  updateProfileValidator,
  updatePasswordValidator,
};
