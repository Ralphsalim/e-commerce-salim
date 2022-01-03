const stripe = require("stripe")(
  "sk_test_51K8VhSHom6BnqbDMvNdrOQ6J0nRT3Ri5bCBQAphRi2de4okOL5ixXQQ7lCPwjEHLMESbCpY7UkqYb8IBC8OcdhBm00MA887oHO"
);

const Order = require("../models/Order");
const Product = require("./../models/Product");

//will create a checkout session
//creates also an order

const createCheckoutSession = async (req, res) => {
  const cart = req.body;

  const { total, products } = await getProductsAndCartTotal(cart);


  //products to store in the data base 
  const productsInfo = products.map((product) => {
    const _id = product._id;
    const quantity = cart[_id].quantity;
    const price = product.price;
    const name = product.name;
    const total = quantity * price;

    //image
    //color selected

    return { name, price, quantity, total, _id };
  });

  
  const createdOrder = await Order.create({ productsInfo });
  
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "eur",
    automatic_payment_methods: { enabled: true },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
    orderId: createdOrder._id,
  });
};

module.exports = { createCheckoutSession };

//gets all products in the cart
//gets total by multiplying the price on the product from database with the item quantity from user cart
//cart is an instance of the cart object in the store(frontend)
//returns total and the products in the cart

const getProductsAndCartTotal = async (cart) => {
  const productIds = Object.keys(cart);
  const products = await Product.find({ _id: { $in: productIds } });
  let total = 0;
  products.forEach((product) => {
    const subtotal = cart[product._id].quantity * product.price;
    total = total + subtotal;
  });

  return { total, products };
};

 