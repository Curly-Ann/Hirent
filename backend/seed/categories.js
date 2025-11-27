const mongoose = require("mongoose");
require("dotenv").config();
const Category = require("../models/Category");

const categories = [
  "Clothes",
  "Electronics",
  "Furniture",
  "Instruments",
  "Sports Equipment",
  "Tools",
  "Appliances",
  "Event Items",
  "Cameras",
  "Books",
  "Camping Gear",
  "Toys",
  "Office Supplies",
  "Travel Essentials"
];

const slugify = text => text.toLowerCase().replace(/ /g, "-");

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB Connected ✅");

    await Category.deleteMany({});
    await Category.insertMany(
      categories.map(name => ({
        name,
        slug: slugify(name),
        featured: true
      }))
    );

    console.log("Categories seeded ✅");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
