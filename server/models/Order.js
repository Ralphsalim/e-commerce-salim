const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  personalInfo: Object,
  deliveryInfo: Object,
  billingInfo: Object,
  productsInfo: Array,
  customer: String,
  isDelivered: { type: Boolean, default: false },
  dateCreated: Date,
});

module.exports = mongoose.model("Order", OrderSchema);
