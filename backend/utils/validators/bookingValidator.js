// =============================================
// BOOKING VALIDATORS (Create, Update Status)
// =============================================

const { body, param } = require("express-validator");

// CREATE BOOKING VALIDATOR
const createBookingValidator = [
  body("itemId")
    .notEmpty()
    .withMessage("Item ID is required")
    .isMongoId()
    .withMessage("Invalid item ID format"),

  body("startDate")
    .notEmpty()
    .withMessage("Start date is required")
    .isISO8601()
    .withMessage("Start date must be a valid date")
    .custom((value) => {
      if (new Date(value) < new Date()) {
        throw new Error("Start date must be in the future");
      }
      return true;
    }),

  body("endDate")
    .notEmpty()
    .withMessage("End date is required")
    .isISO8601()
    .withMessage("End date must be a valid date")
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.startDate)) {
        throw new Error("End date must be after start date");
      }
      return true;
    }),

  body("totalPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Total price must be a non-negative number"),

  body("notes")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Notes must not exceed 500 characters"),
];

// UPDATE BOOKING STATUS VALIDATOR
const updateBookingStatusValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid booking ID format"),

  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(["pending", "confirmed", "completed", "cancelled", "rejected"])
    .withMessage("Status must be pending, confirmed, completed, cancelled, or rejected"),

  body("notes")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Notes must not exceed 500 characters"),
];

// CANCEL BOOKING VALIDATOR
const cancelBookingValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid booking ID format"),

  body("reason")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Reason must not exceed 500 characters"),
];

module.exports = {
  createBookingValidator,
  updateBookingStatusValidator,
  cancelBookingValidator,
};
