const passport = require("passport");

const LoginUser = (req, res, next) => {
  console.log("sent");
  passport.authenticate("local", (err, user, info) => {
    console.log(info);
    console.log(user);
    if (err) res.send(err);
    if (!user) res.json({ info, user });
    if (user) res.json({ info, user });
  })(req, res, next);
};

module.exports = LoginUser;
