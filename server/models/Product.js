const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  images: Array,
  url:String,
  color: Array,
  filters: Array,

  date_created: Date,
});

module.exports = mongoose.model('Product', ProductSchema)
