const { createIndexes } = require("../models/Product");
const Product = require("../models/Product");

const getProduct = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  res.status(200).json({ product });
};

const getAllProducts = async (req, res) => {
  console.log(req.query);
  console.log("getting");
  const category = req.query.category;
  const products = await Product.find({ category });

  const result = {};
  products.forEach((product) => {
    result[product._id.toString()] = product;
  });

  res.send(result);
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

module.exports = { getAllProducts, createProducts, getProduct };
