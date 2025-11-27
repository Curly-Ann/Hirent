const express = require("express");
const router = express.Router();
const controller = require("../controllers/homepageController");

router.get("/categories/featured", controller.getFeaturedCategories);
router.get("/categories/:slug/items", controller.getItemsByCategory);
router.get("/items/featured", controller.getFeaturedItems);
router.get("/search", controller.searchItems);

module.exports = router;
