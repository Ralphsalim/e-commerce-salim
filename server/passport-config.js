const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("./models/User");

module.exports = (passport) => {
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      (username, password, done) => {
        User.findOne({ email: username }, (err, user) => {
          if (err) {
            console.log(err);
            return done(err);
          }

          if (!user) {
            console.log("user doesnot exist ");
            return done(null, false, {message:'Input correct email', field:'email'});
          }

          bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
              return done(err);
            }
            if (result === true) {
              console.log("user and password match");
              return done(null, user, {message:'User and Password Authenticated'});
            } else {
              console.log("password is wrong");
              return done(null, false, {message:'Input correct password', field:'password'});
            }
          });
        });
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById({ _id: id }, function (err, user) {
      done(err, user);
    });
  });
};
 