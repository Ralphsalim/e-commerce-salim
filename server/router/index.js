const path = require("path");
const LoginUser = require("../controllers/login");
const { createOrder } = require("../controllers/orders");
const { getAllProducts, createProducts } = require("../controllers/products");
const {
  createCheckoutSession, updateCheckoutSession,
  
} = require("../controllers/stripe");
const { webhooks } = require("../controllers/stripewebhooks");
const { createUser, patchUser } = require("../controllers/user");

const router = require("express").Router();

router.route("/products").get(getAllProducts).post(createProducts);
router.route("/checkout-session").post(createCheckoutSession).patch(updateCheckoutSession);
router.route("/login").post(LoginUser);
router.route("/user").post(createUser).patch(patchUser);
router.route("/orders").post(createOrder);
router.route("/webhooks").post(webhooks);

router.route("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../client/build/index.html", "index.html")
  );
});

module.exports = router;
