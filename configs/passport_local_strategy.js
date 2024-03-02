// Importing passport and passport-local for local authentication...
const passport = require("passport");
const LocalStrategy = require("passport-local");

// Importing user model for database operations on user collection.
const User = require("../models/user");

// Configuring  passport to use the local strategy for handling login
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    function (req, email, password, done) {
      // console.log("local strategy callback called");
      User.findOne({ email: email })
        .then((user) => {
          if (!user || user.password !== password) {
            req.flash("error", "Username or Password incorrect");
            return done(null, false);
          }

          return done(null, user);
        })
        .catch((err) => {
          req.flash("error", err);
          return done(err);
        });
    }
  )
);

// Configuring  serializeUser & deserializeUser methods of Passport for encrypting and decrypting the user details from sessions and  cookies
passport.serializeUser((user, done) => {
  // console.log("SerializeUser function called...");
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // console.log("DeserializeUser function called...");
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

// Creating a function on passport for checking the authenticity of a user...
passport.checkAuthentication = function (req, res, next) {
  // console.log("In checkAuthentication function of passport.js file...");
  if (req.isAuthenticated()) {
    return next();
  }

  return res.redirect("/users/sign-in");
};


// And creating another function , if a user is authenticated then its details should be sent to response loclas for authenticaion on front-end side...
passport.setAuthenticatedUser = function (req, res, next) {
  // console.log(
  //   "In setAuthenticatedUser middleware of passport-local strategy..."
  // );
  if (req.isAuthenticated()) {
    // console.log(req.user);
    res.locals.user = req.user;
  }

  next();
};

module.exports = passport;
