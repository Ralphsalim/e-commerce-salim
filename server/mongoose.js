const mongoose = require("mongoose");

const connect = (uri) => {
  mongoose
    .connect(uri, ()=>console.log('connection is a success'))
    // .then(() => consoel.log("connection is a success"))
    // .catch((err) => console.log("connection is a failure"));
};

module.exports = { connect };
