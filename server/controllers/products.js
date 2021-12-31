const { createIndexes } = require("../models/Product");
const Product = require("../models/Product");

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.send(products);
};

const createProducts = async (req, res) => {
  const products = req.body; //an array

  try {
    products.map(async (product) => {
      const result = await Product.create(product);
    });
    res.status(200).send("success");
  } catch (error) {
    console.log(error);
    res.status(401).send("there was an error");
  }
};

module.exports = { getAllProducts, createProducts };
