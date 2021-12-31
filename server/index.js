const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const router = require("./router");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

/* Middleware */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use("/api/v1", router);
app.use(express.static(path.join(__dirname, "../client/build")));//serving the react build

app.listen(process.env.PORT || 5000, () => {
  mongoose.connect(process.env.MONGODB_URI, () => {
    console.log("connection is a success");
    console.log("server is running");
  });
});
