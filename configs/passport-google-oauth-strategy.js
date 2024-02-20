const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;

const crypto = require("crypto");
const User = require("../models/user");

passport.use(
  new googleStrategy(
    {
      clientID:
        "498113812873-o7r7rsf0va92h3pbt5grhgtdlq605btm.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:8000/users/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        let oldUser = await User.findOne({ email: emails[0].value });
        console.log(profile);
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
