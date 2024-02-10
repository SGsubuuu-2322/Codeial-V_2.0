const passport = require("passport");
const LocalStrategy = require("passport-local");

const User = require("../models/Users");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    function (email, password, done) {
      console.log("local strategy callback called");
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
    }
  )
);

passport.serializeUser((user, done) => {
  console.log("SerializeUser function called...");
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log("DeserializeUser function called...");
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

passport.checkAuthentication = function (req, res, next) {
  console.log("In checkAuthentication function of passport.js file...");
  if (req.isAuthenticated()) {
    return next();
  }

  return res.redirect("/users/sign-in");
};

passport.setAuthenticatedUser = function (req, res, next) {
  console.log(
    "In setAuthenticatedUser middleware of passport-local strategy..."
  );
  if (req.isAuthenticated()) {
    console.log(req.user);
    res.locals.user = req.user;
  }

  next();
};

module.exports = passport;
