const passport = require("passport");
const env = require("./environment");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;

const crypto = require("crypto");
const User = require("../models/user");

passport.use(
  new googleStrategy(
    {
      clientID: env.google_client_id,
      clientSecret: env.google_client_secret,
      callbackURL: env.google_callback_url,
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        let oldUser = await User.findOne({ email: profile.emails[0].value });
        // console.log("Tokens are: ", accessToken, refreshToken);
        // console.log(profile);
        if (oldUser) {
          return done(null, oldUser);
        } else {
          let newUser = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: crypto.randomBytes(20).toString("hex"),
          });
          if (newUser) {
            return done(null, newUser);
          }
        }
      } catch (err) {
        console.log("Error in finding user in Google Strategy...", err);
        return;
      }
    }
  )
);

module.exports = passport;
