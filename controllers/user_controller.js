const User = require("../models/user");

module.exports.profile = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    return res.render("user_profile", {
      title: "Profile",
      user_profile: user,
    });
  } catch (err) {
    console.log("Error: ", err);
    return;
  }
};

module.exports.updateProfile = async (req, res) => {
  try {
    if (req.user.id == req.params.id) {
      await User.findByIdAndUpdate(req.params.id, req.body);
      return res.redirect("back");
    } else {
      return res.status(401).send("Unauthorized...");
    }
  } catch (err) {
    console.log("Error: ", err);
    return;
  }
};

module.exports.userSignIn = (req, res) => {
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

module.exports.create = async (req, res) => {
  try {
    if (req.body.password != req.body.confirm_password) {
      return res.redirect("back");
    }

    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      let newUser = await User.create({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
      });
      if (newUser) {
        return res.redirect("/users/sign-in");
      }
      return res.redirect("back");
    } else {
      return res.redirect("back");
    }
  } catch (err) {
    console.log("Error", err);
    return;
  }
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
