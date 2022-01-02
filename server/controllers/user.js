const bcrypt = require("bcrypt");
const User = require("./../models/User");

const createUser = async (req, res) => {
  const user = req.body;
  const encryptedPassword = await bcrypt.hash(req.body.password, 10);
  User.create({ ...user, password: encryptedPassword }, (err, user) => {
    console.log(user);
  });
  res.send("user registered");
};

module.exports = { createUser };
