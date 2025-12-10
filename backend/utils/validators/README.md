# Backend Validation System Documentation

## Overview
This directory contains a centralized, standardized validation system for the Hirent backend using `express-validator`.

## Folder Structure
```
utils/validators/
├── userValidator.js          # User registration, login, profile updates
├── itemValidator.js          # Item creation and updates
├── bookingValidator.js       # Booking creation and status updates
├── validationHandler.js      # Centralized error handler middleware
└── README.md                 # This file
```

## How It Works

### 1. Validators (userValidator.js, itemValidator.js, bookingValidator.js)
Each validator file exports arrays of validation rules using `express-validator`:

```javascript
const { body, param } = require("express-validator");

const registerValidator = [
  body("email").isEmail().withMessage("Invalid email"),
  body("password").isLength({ min: 6 }).withMessage("Min 6 chars"),
  // ... more rules
];
```

### 2. Validation Handler (validationHandler.js)
Middleware that checks for validation errors and returns consistent JSON:

```javascript
const validationHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array().map(err => ({
        field: err.param,
        message: err.msg,
        value: err.value,
      })),
    });
  }
  next();
};
```

### 3. Route Integration
Routes use validators + handler before reaching controllers:

```javascript
router.post(
  "/register",
  registerValidator,      // ← Validation rules
  validationHandler,      // ← Error handler
  registerUser            // ← Controller
);
```

## Available Validators

### User Validators
- **registerValidator** - Email, password, name, role
- **loginValidator** - Email, password
- **updateProfileValidator** - All profile fields (optional)
- **updatePasswordValidator** - Current password, new password, confirm

### Item Validators
- **createItemValidator** - All required item fields
- **updateItemValidator** - All optional item fields

### Booking Validators
- **createBookingValidator** - Item ID, dates, price
- **updateBookingStatusValidator** - Status, notes
- **cancelBookingValidator** - Reason (optional)

## Validation Rules Applied

### User Fields
- **email**: Valid format, normalized
- **password**: Min 6 chars, 1 number, 1 special char
- **name**: 2-50 characters
- **phone**: Philippine format (10 digits)
- **businessName**: 2-100 characters
- **role**: "renter", "owner", or "admin"

### Item Fields
- **title**: 3-100 characters (required)
- **description**: 10-2000 characters (required)
- **pricePerDay**: Positive number (required)
- **category**: 2-50 characters (required)
- **location**: 2-100 characters (required)
- **condition**: "New", "Like New", "Good", "Fair"
- **deliveryFee**: Required if deliveryAvailable=true
- **cancellationPolicy**: "flexible", "moderate", "strict"

### Booking Fields
- **itemId**: Valid MongoDB ID
- **startDate**: ISO8601 date, must be future
- **endDate**: ISO8601 date, must be after startDate
- **status**: "pending", "confirmed", "completed", "cancelled", "rejected"

## Error Response Format

All validation errors return this format:

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format",
      "value": "invalid-email"
    },
    {
      "field": "password",
      "message": "Password must be at least 6 characters",
      "value": "123"
    }
  ]
}
```

## Routes Using Validators

### Auth Routes (/api/auth)
- `POST /register` → registerValidator + validationHandler
- `POST /login` → loginValidator + validationHandler
- `PUT /profile` → updateProfileValidator + validationHandler

### Item Routes (/api/items)
- `POST /` → createItemValidator + validationHandler
- `PUT /:id` → updateItemValidator + validationHandler

### Booking Routes (/api/bookings)
- `POST /` → createBookingValidator + validationHandler
- `PUT /:id/cancel` → cancelBookingValidator + validationHandler
- `PUT /:id/status` → updateBookingStatusValidator + validationHandler

## Adding New Validators

1. Create rules in appropriate validator file:
```javascript
const newValidator = [
  body("field").notEmpty().withMessage("Field is required"),
  // ... more rules
];
```

2. Export from validator file:
```javascript
module.exports = {
  existingValidator,
  newValidator,  // ← Add here
};
```

3. Import in route file:
```javascript
const { newValidator } = require("../utils/validators/userValidator");
```

4. Use in route:
```javascript
router.post("/endpoint", newValidator, validationHandler, controller);
```

## Best Practices

✅ **DO:**
- Always use `validationHandler` after validators
- Use `.trim()` for string fields
- Use `.normalizeEmail()` for emails
- Validate types (number, boolean, etc.)
- Use `.optional()` for non-required fields
- Provide clear error messages

❌ **DON'T:**
- Skip validation handler
- Mix validation approaches
- Validate in controllers
- Use hardcoded error messages
- Forget to trim/normalize strings

## Testing Validation

Example curl request:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John",
    "email": "invalid-email",
    "password": "123"
  }'
```

Expected response:
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format",
      "value": "invalid-email"
    },
    {
      "field": "password",
      "message": "Password must be at least 6 characters",
      "value": "123"
    }
  ]
}
```

## Troubleshooting

**Issue**: Validation not working
- Check route imports correct validator
- Ensure validationHandler is in middleware chain
- Verify validator rules are correct

**Issue**: Wrong error format
- Check validationHandler is being used
- Verify express-validator is installed
- Check route order (validators before handler)

**Issue**: Fields not validated
- Add field to validator array
- Check field name matches request body
- Ensure rule is correct (body, param, query)
