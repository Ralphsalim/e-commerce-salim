const bcrypt = require("bcrypt");
const User = require("./../models/User");

const createUser = async (req, res) => {
  const user = req.body;
  User.findOne({ email: user.email }, async (err, user) => {
    if (user) {
      res.json({
        status:'fail',
        message: "An Account Connected To This Email Already Exists",
      });
    } else {
      console.log("creating");
      const encryptedPassword = await bcrypt.hash(req.body.password, 10);
      User.create({ ...user, password: encryptedPassword }, (err, user) => {
        res.json({ message: "Account Created Successfully", status:'success' });
      });
    }
  });
};

const patchUser = async (req, res) => {
  const id = req.query.id;

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { $set: req.body },
    { new: true }
  );
  console.log(updatedUser);
  console.log("patching");
  res.send(updatedUser);
};

module.exports = { createUser, patchUser };
