const passport = require("passport");
const LocalStrategy = require("passport-local");

const User = require("../models/Users");

passport.use(
  new LocalStrategy({
    usernameField: "email",
    function(email, password, done) {
      User.findOne({ email: email })
        .then((user) => {
          if (!user || user.password !== password) {
            console.log("Incorrect Username or Password...");
            return done(null, false);
          }

          return done(null, user);
        })
        .catch((err) => {
          console.log("Error in passport for finding the user...", err);
          return done(err);
        });
    },
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => {
      return done(null, user);
    })
    .catch((err) => {
      console.log(
        "Error in deserializing the user in passport local strategy...",
        err
      );
      return done(err);
    });
});

module.exports = passport;
