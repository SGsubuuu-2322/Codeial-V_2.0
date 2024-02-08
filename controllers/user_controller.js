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
