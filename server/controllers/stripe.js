const stripe = require("stripe")(
  "sk_test_51K8VhSHom6BnqbDMvNdrOQ6J0nRT3Ri5bCBQAphRi2de4okOL5ixXQQ7lCPwjEHLMESbCpY7UkqYb8IBC8OcdhBm00MA887oHO"
);

const Product = require("./../models/Product");

const createCheckoutSession = async (req, res) => {
  const cart = req.body;

  const cartTotal = await getCartTotal(cart);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: cartTotal,
    currency: "eur",
    automatic_payment_methods: { enabled: true },
  });

  res.send({ clientSecret: paymentIntent.client_secret });
};

module.exports = { createCheckoutSession };

//gets all products in the cart
//gets total by multiplying the price on the product from database with the item quantity from user cart
//cart is an instance of the cart object in the store(frontend)
const getCartTotal = async (cart) => {
  const productIds = Object.keys(cart);
  const products = await Product.find({ _id: { $in: productIds } });
  let total = 0;
  products.forEach((product) => {
    const subtotal = cart[product._id].quantity * product.price;
    total = total + subtotal;
  });

  return total;
};

//when you use session, the checkout is hosted on Klarna page
//
//
//    const products = await getItems(req.body);
//   const session = await stripe.checkout.sessions.create({
//     line_items: products,
//     mode: "payment",
//     success_url: "http://localhost:3000/checkout",
//     cancel_url: "http://localhost:3000",
//   });

/**
 * 
 * const getItems = async (cart) => {
  const productIds = Object.keys(cart);
  const products = await Product.find({ _id: { $in: productIds } });

  const stripeProducts = products.map((product) => {
    const price = product.price;
    const name = product.name;
    const id = product._id;
    const quantity = cart[id].quantity;

    return {
      price_data: {
        currency: "sek",
        product_data: {
          name: name,
        },
        unit_amount: price * 100,
      },
      quantity: quantity,
    };
  });

  return stripeProducts;
};

 */

//   console.log(session);
//   res.send({ url: session.url });
