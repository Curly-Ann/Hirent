// =============================================
// ITEM VALIDATORS (Create, Update)
// =============================================

const { body } = require("express-validator");

// CREATE ITEM VALIDATOR
const createItemValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Item title is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters"),

  body("itemName")
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("Item name must be between 3 and 100 characters"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 10, max: 2000 })
    .withMessage("Description must be between 10 and 2000 characters"),

  body("category")
    .trim()
    .notEmpty()
    .withMessage("Category is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Category must be between 2 and 50 characters"),

  body("pricePerDay")
    .notEmpty()
    .withMessage("Price per day is required")
    .isFloat({ min: 0.01 })
    .withMessage("Price must be a positive number"),

  body("securityDeposit")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Security deposit must be a non-negative number"),

  body("condition")
    .trim()
    .notEmpty()
    .withMessage("Condition is required")
    .isIn(["New", "Like New", "Good", "Fair"])
    .withMessage("Condition must be New, Like New, Good, or Fair"),

  body("location")
    .trim()
    .notEmpty()
    .withMessage("Location is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Location must be between 2 and 100 characters"),

  body("zone")
    .trim()
    .notEmpty()
    .withMessage("Zone/Barangay is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Zone must be between 2 and 50 characters"),

  body("postalCode")
    .trim()
    .notEmpty()
    .withMessage("Postal code is required")
    .isLength({ min: 4, max: 10 })
    .withMessage("Postal code must be between 4 and 10 characters"),

  body("province")
    .trim()
    .notEmpty()
    .withMessage("Province is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Province must be between 2 and 50 characters"),

  body("deliveryAvailable")
    .optional()
    .isBoolean()
    .withMessage("Delivery available must be true or false"),

  body("deliveryFee")
    .optional()
    .if(() => body("deliveryAvailable").equals("true"))
    .isFloat({ min: 0 })
    .withMessage("Delivery fee must be a non-negative number"),

  body("availabilityType")
    .optional()
    .isIn(["always", "specific-dates"])
    .withMessage("Availability type must be always or specific-dates"),

  body("minimumRentalDays")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Minimum rental days must be at least 1"),

  body("maximumRentalDays")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Maximum rental days must be at least 1"),

  body("advanceNoticeDays")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Advance notice days must be non-negative"),

  body("color")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("Color must not exceed 50 characters"),

  body("instantBooking")
    .optional()
    .isBoolean()
    .withMessage("Instant booking must be true or false"),

  body("requireApproval")
    .optional()
    .isBoolean()
    .withMessage("Require approval must be true or false"),

  body("identificationRequired")
    .optional()
    .isBoolean()
    .withMessage("Identification required must be true or false"),

  body("insuranceRequired")
    .optional()
    .isBoolean()
    .withMessage("Insurance required must be true or false"),

  body("cancellationPolicy")
    .optional()
    .isIn(["flexible", "moderate", "strict"])
    .withMessage("Cancellation policy must be flexible, moderate, or strict"),
];

// UPDATE ITEM VALIDATOR
const updateItemValidator = [
  body("title")
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage("Description must be between 10 and 2000 characters"),

  body("category")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Category must be between 2 and 50 characters"),

  body("pricePerDay")
    .optional()
    .isFloat({ min: 0.01 })
    .withMessage("Price must be a positive number"),

  body("securityDeposit")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Security deposit must be a non-negative number"),

  body("condition")
    .optional()
    .isIn(["New", "Like New", "Good", "Fair"])
    .withMessage("Condition must be New, Like New, Good, or Fair"),

  body("location")
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Location must be between 2 and 100 characters"),

  body("zone")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Zone must be between 2 and 50 characters"),

  body("postalCode")
    .optional()
    .trim()
    .isLength({ min: 4, max: 10 })
    .withMessage("Postal code must be between 4 and 10 characters"),

  body("province")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Province must be between 2 and 50 characters"),

  body("deliveryAvailable")
    .optional()
    .isBoolean()
    .withMessage("Delivery available must be true or false"),

  body("deliveryFee")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Delivery fee must be a non-negative number"),

  body("availabilityType")
    .optional()
    .isIn(["always", "specific-dates"])
    .withMessage("Availability type must be always or specific-dates"),

  body("minimumRentalDays")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Minimum rental days must be at least 1"),

  body("maximumRentalDays")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Maximum rental days must be at least 1"),

  body("advanceNoticeDays")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Advance notice days must be non-negative"),

  body("color")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("Color must not exceed 50 characters"),

  body("instantBooking")
    .optional()
    .isBoolean()
    .withMessage("Instant booking must be true or false"),

  body("requireApproval")
    .optional()
    .isBoolean()
    .withMessage("Require approval must be true or false"),

  body("identificationRequired")
    .optional()
    .isBoolean()
    .withMessage("Identification required must be true or false"),

  body("insuranceRequired")
    .optional()
    .isBoolean()
    .withMessage("Insurance required must be true or false"),

  body("cancellationPolicy")
    .optional()
    .isIn(["flexible", "moderate", "strict"])
    .withMessage("Cancellation policy must be flexible, moderate, or strict"),

  body("status")
    .optional()
    .isIn(["active", "inactive", "archived"])
    .withMessage("Status must be active, inactive, or archived"),
];

module.exports = {
  createItemValidator,
  updateItemValidator,
};
