const path = require("path");
const { getAllProducts, createProducts } = require("../controllers/products");
const { createCheckoutSession } = require("../controllers/stripe");
const router = require("express").Router();


router.route("/products").get(getAllProducts).post(createProducts);
router.route("/create-checkout-session").post(createCheckoutSession);
router.route('*', (req, res)=>{ 
    res.sendFile(path.join(__dirname, '../client/build/index.html', 'index.html'))
})
module.exports = router;
