const User = require("../models/user");

module.exports.profile = function (req, res) {
  console.log("User profile request received!");
  User.findById(req.params.id)
    .then((user) => {
      return res.render("user_profile", {
        title: "Profile",
        user_profile: user,
      });
    })
    .catch((err) => {
      console.log("There's some issue in finding the user from DB...", err);
      return;
    });
};

module.exports.updateProfile = function (req, res) {
  if (req.user.id == req.params.id) {
    User.findByIdAndUpdate(req.params.id, req.body)
      .then((user) => {
        return res.redirect("back");
      })
      .catch((err) => {
        console.log(
          "There's some error in updating the user details in DB...",
          err
        );
        return;
      });
  } else {
    return res.status(401).send("Unauthorized...");
  }
};

module.exports.userSignIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_signin", {
    title: "Codeial | Sign-in",
  });
};
module.exports.userSignUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
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
  console.log("From create-session handler or action: ", req.user);
  // ToDo
  return res.redirect("/");
};

module.exports.destroySession = function (req, res) {
  req.logout((err) => {
    if (err) {
      console.log("There's some error in logging out the user", err);
      return;
    } else {
      return res.redirect("/");
    }
  });
};
