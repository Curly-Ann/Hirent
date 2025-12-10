// =============================================
// VALIDATION HANDLER MIDDLEWARE
// =============================================

const { validationResult } = require("express-validator");

/**
 * Centralized validation error handler
 * Checks for validation errors and returns consistent error response
 * If no errors, passes control to next middleware/route handler
 */
const validationHandler = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorArray = errors.array().map((err) => ({
      param: err.param,
      msg: err.msg,
    }));
    
    console.log('[VALIDATION] Errors found:', errorArray);
    
    // Return errors in format expected by frontend: { param, msg }
    return res.status(400).json({
      success: false,
      errors: errorArray,
    });
  }

  console.log('[VALIDATION] No errors, proceeding to controller');
  // No errors, proceed to next middleware/controller
  next();
};

module.exports = validationHandler;
