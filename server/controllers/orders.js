const User = require("../models/User");
const Order = require("./../models/Order");
const createOrder = async (req, res) => {
  Order.findByIdAndUpdate(
    req.query.id,
    { $set: req.body },
    { new: true },
    (err, doc) => {
      console.log(doc);
    }
  );

  res.send("orders");
};

const getOrders = async (req, res) => {
  const userId = req.query.id;

  try {
    const user = await User.findById(userId);
    const orderIds = user.orders;
    console.log(orderIds);

    const orders = await Order.find({ _id: { $in: orderIds } });
    console.log(orders);
    res.status(200).send({ message: "success", data: orders });
  } catch (error) {
    res.status(500).send({ message: "error" });
  }
};

module.exports = { createOrder, getOrders };
