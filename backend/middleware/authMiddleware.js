// Authentication middleware for JWT verification
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Token format: "Bearer <token>"
    const splitToken = token.split(' ')[1];
    const decoded = jwt.verify(splitToken, process.env.JWT_SECRET);

    // Attach user info to request (including role for admin)
    req.user = {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role || 'renter', // default to renter if not specified
    };
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};