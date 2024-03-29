const passport = require("passport");
const env = require("./environment");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const User = require("../models/user");

let opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: env.jwt_secret_key,
};

passport.use(
  new JWTStrategy(opts, async function (jwtPayLoad, done) {
    try {
      let user = await User.findById(jwtPayLoad._id);

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      console.log("Error in jwt authentication: ", err);
      return;
    }
  })
);

module.exports = passport;
