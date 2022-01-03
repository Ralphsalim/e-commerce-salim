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

module.exports = { createOrder };
