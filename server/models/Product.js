const mongoose = require("mongoose");

const variantSchema = mongoose.Schema({
  images: Array,
  color: String,
  sizes: [{ size: String, qty: Number, dimensions: String, price: Number }],
  price: Number,
});

const ProductSchema = mongoose.Schema({
  name: String,
  description: String,
  manufacturer: String,
  variants: [variantSchema],
  date_created: Date,
  label: String,
  category: { type: String, enum: ["men", "women"], required: true },
});

module.exports = mongoose.model("Product", ProductSchema);
