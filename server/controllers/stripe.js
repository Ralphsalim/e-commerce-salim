const stripe = require("stripe")(
  "sk_test_51K8VhSHom6BnqbDMvNdrOQ6J0nRT3Ri5bCBQAphRi2de4okOL5ixXQQ7lCPwjEHLMESbCpY7UkqYb8IBC8OcdhBm00MA887oHO"
);

const Order = require("../models/Order");
const User = require("../models/User");
const Product = require("./../models/Product");

//will create a checkout session
//creates also an order

const createCheckoutSession = async (req, res) => {
  console.log("creating session ");
  const cart = req.body.items;
  const orderId = req.body.orderId;

  //products ti be sent o db
  const { total, products } = await getProductsAndCartTotal(cart);

  //creates the order in the dataBase
  let createdOrder;
  if (orderId) {
    createdOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        productsInfo: products,
      },
      { new: true }
    );
  }
  createdOrder = await Order.create({ productsInfo: products });
  const createdOrderId = await createdOrder._id.toString();

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "eur",
    automatic_payment_methods: { enabled: true },
    metadata: { orderId: createdOrderId },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
    paymentIntentId: paymentIntent.id,
    orderId: createdOrderId,
  });
};

const updateCheckoutSession = async (req, res) => {
  //will update the payment intent with data about the order
  const paymentIntentId = req.query.paymentIntentId;
  let orderId = req.query.orderId;
  // const cartProducts = req.body.cartProducts;
  const totals = req.body.totals;
  const customer = req.query.userId;
  const billingInfo = req.body.currentOrder.billingInfo;
  const personalInfo = req.body.currentOrder.personalInfo;

  // let createdOrder;

  // const productsInfo = await getProductsinfo(cartProducts, totals);

  const updateData = {
    billingInfo,
    personalInfo,
    customer,
  };

  if (customer) {
    await User.findByIdAndUpdate(customer, {
      $addToSet: { orders: orderId },
    });
  }

  await Order.findByIdAndUpdate(orderId, updateData);

  const paymentIntent = await stripe.paymentIntents.update(paymentIntentId, {
    metadata: { orderId, customer },
    receipt_email: personalInfo.email,
  });

  console.log(paymentIntent);
  res.send();
  // res.json({ orderId: createdOrder._id });
};

// const getProductsinfo = async (productIds, totals) => {
//   const products = await Product.find({ _id: { $in: productIds } });

//   const productsInfo = products.map((product) => {
//     const id = product._id;
//     const name = product.name;
//     const price = product.price;
//     const url = product.url;
//     const quantity = totals[id].quantity; //will throw error
//     const total = quantity * price;

//     return { id, name, price, url, quantity, total };
//   });

//   return productsInfo;
// };

module.exports = { createCheckoutSession, updateCheckoutSession };

//gets all products in the cart
//gets total by multiplying the price on the product from database with the item quantity from user cart
//cart is an instance of the cart object in the store(frontend)
//returns total and the products in the cart

const getProductsAndCartTotal = async (cart) => {
  const productIds = [];
  const productVariants = [];

  cart.forEach((item) => {
    productIds.push(item.id);
    productVariants.push(item);
  });

  const productsDB = await Product.find({ _id: { $in: productIds } });
  let total = 0;
  const products = [];

  productVariants.forEach((productvariant) => {
    for (const product of productsDB) {
      if (product._id.toString() === productvariant.id) {
        const quantity = productvariant.quantity;
        const color = productvariant.color;
        const size = productvariant.size;
        const variants = product.variants;

        const { result, price, image } = getVariantData(
          quantity,
          size,
          color,
          variants
        );
        total = total + result;

        //construct a product
        const temp = {
          _id: product._id.toString(),
          price,
          size,
          color,
          quantity,
          name: product.name,
          image,
        };
        products.push(temp); //store product to final array
        break;
      }
    }
  });

  return { total, products };
};

//returns the price, total and image of the variant
function getVariantData(quantity, size, color, variants) {
  let result;
  let price;
  let image;

  loop1: for (const variant of variants) {
    if (variant.color === color) {
      image = variant.images[0];
      for (const el of variant.sizes) {
        if (el.size === size) {
          result = el.price * quantity;
          price = el.price;
          break loop1;
        }
      }
    }
  }

  return { price, result, image };
}
