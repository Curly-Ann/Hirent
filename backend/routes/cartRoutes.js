const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  addToCart,
  removeFromCart,
  updateCartItem,
  getCart
} = require('../controllers/cartController');

// /api/cart/add
router.post('/add', auth, addToCart);

// /api/cart/remove/:itemId
router.delete('/remove/:itemId', auth, removeFromCart);

// /api/cart/update
router.put('/update', auth, updateCartItem);

// /api/cart
router.get('/', auth, getCart);

module.exports = router;