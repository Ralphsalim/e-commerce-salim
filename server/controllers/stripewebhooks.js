const Order = require("../models/Order");
const User = require("../models/User");
const nodemailer = require("nodemailer");

const stripe = require("stripe")(
  "sk_test_51K8VhSHom6BnqbDMvNdrOQ6J0nRT3Ri5bCBQAphRi2de4okOL5ixXQQ7lCPwjEHLMESbCpY7UkqYb8IBC8OcdhBm00MA887oHO"
);
const endpointSecret = "whsec_2VwnmH3ICXdgePxZoKL4rq7f0QHlP2G1";

const webhooks = async (request, response) => {
  let event = request.body;
  // Only verify the event if you have an endpoint secret defined.
  // Otherwise use the basic event deserialized with JSON.parse

  // Handle the event

  const paymentIntent = event.data.object;
  const orderId = paymentIntent.metadata.orderId; //id that maps to the order for which the payment was made

  switch (event.type) {
    case "payment_intent.succeeded":
      const paidOrder = await Order.findById(orderId);
      sendEmail();

      break;
    case "payment_method.attached":
      const paymentMethod = event.data.object;
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
      break;
    case "payment_intent.payment_failed":
    case "payment_intent.canceled": {
      await Order.findByIdAndDelete(orderId); //deletes the failed order from data base

      //deletes id reference on User to the deleted order
      if (customer)
        await User.findByIdAndUpdate(customer, { $pull: { orders: orderId } });
      break;
    }

    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
      break;
  }
};

const sendEmail = () => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "nkimbasalim@gmail.com",
      pass: "Nkimba0301@",
    },
  });

  let mailOptions = {
    from: "nkimbasalim@gmail.com",
    to: "titan.inc.se@gmail.com",
    subject: "testing",
    body: ``,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    console.log(err);
    console.log(info);
  });
};

module.exports = { webhooks };
