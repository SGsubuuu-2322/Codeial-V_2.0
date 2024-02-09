const User = require("../models/Users");

module.exports.profile = function (req, res) {
  return res.render("user_profile", {
    title: "Profile",
  });
};

module.exports.userSignIn = function (req, res) {
  return res.render("user_signin", {
    title: "Codeial | Sign-in",
  });
};
module.exports.userSignUp = function (req, res) {
  return res.render("user_signup", {
    title: "Codeial | Sign-up",
  });
};

module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        User.create({
          email: req.body.email,
          password: req.body.password,
          name: req.body.name,
        })
          .then((user) => {
            return res.redirect("/users/sign-in");
          })
          .catch((err) => {
            console.log("Error in creating the user in DB...", err);
            return;
          });
      } else {
        return res.redirect("back");
      }
    })
    .catch((err) => {
      console.log("Error in finding the user in signing up....", err);
      return;
    });
};
module.exports.createSession = function (req, res) {
  // ToDo
  return res.redirect("/users/profile");
};
