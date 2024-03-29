// Importing required models for processing request and response
const User = require("../models/user");
const ResetPasswordToken = require("../models/reset_pass_token");

// Importing the fs  module to read files in Node.js
const fs = require("fs");

// Importing the path module , which provides utilities for working with file and
const path = require("path");

// Importing crypto  module, which provide cryptographic functionality like generating  random bytes or creating hashes .
const crypto = require("crypto");

// Importing kue  library for handling jobs queue
const queue = require("../configs/kue");

// Importing email worker for  sending emails using nodemailer
const resetPassEmailWorker = require("../workers/reset_pass_email_worker");
const successPassResetEmailWorker = require("../workers/success_pass_reset_email_worker");


// controller to render profile page with user and its relevant information
module.exports.profile = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    let dec = false;
    dec = user.friendships.some((friendId) => friendId.equals(req.user.id));

    // console.log("******Decision*****: ", dec);

    return res.render("user_profile", {
      title: "Profile",
      user_profile: user,
      friendship_value: dec,
    });
  } catch (err) {
    console.log("Error: ", err);
    return;
  }
};

// Controller action that will update the user profile with its information
module.exports.updateProfile = async (req, res) => {
  try {
    if (req.user.id == req.params.id) {
      let user = await User.findById(req.params.id);

      User.uploadedAvatar(req, res, function (err) {
        if (err) {
          console.log("********Error in multer: ", err);
          return res.status(500).json({ error: "Error in multer" });
        }

        user.name = req.body.name;
        user.email = req.body.email;

        if (req.file) {
          if (user.avatar) {
            const filePath = path.join(__dirname, "..", user.avatar);
            if (fs.existsSync(filePath)) {
              console.log("The file exists.");
              fs.unlinkSync(filePath);
            }
          }
          user.avatar = User.avatarPath + "/" + req.file.filename;
        }
        user.save();

        return res.redirect("back");
      });
    } else {
      return res.status(401).send("Unauthorized...");
    }
  } catch (err) {
    console.log("Error: ", err);
    return;
  }
};

// Controller action to render user sign-in page
module.exports.userSignIn = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_signin", {
    title: "Codeial | Sign-in",
  });
};

// Controller action to render user sign-up page
module.exports.userSignUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_signup", {
    title: "Codeial | Sign-up",
  });
};


// Controller action to create a new user account...
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

// Controller action to create session for authenticated users...
module.exports.createSession = function (req, res) {
  // console.log("From create-session handler or action: ", req.user);
  req.flash("success", "Logged In Successfully...");
  return res.redirect("/");
};

// Controller action to delete session for authenticated users...
module.exports.destroySession = function (req, res) {
  req.logout((err) => {
    if (err) {
      console.log("There's some error in logging out the user", err);
      return;
    } else {
      req.flash("success", "You'hv been logged out...");
      return res.redirect("/");
    }
  });
};

// Controller action render forgot password page....
module.exports.forgotPassword = function (req, res) {
  return res.render("forgot_password", {
    title: "Forgot Password?",
  });
};

// Controller action to verify email for authenticated user to be  able to reset his/her password...
module.exports.verifyEmail = async function (req, res) {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user) {
      req.flash("error", "No account with this Email found!");
      return res.redirect("back");
    } else if (user) {
      let newResetPassToken = await ResetPasswordToken.create({
        user: user.id,
        accessToken: crypto.randomBytes(20).toString("hex"),
      });

      if (newResetPassToken) {
        newResetPassToken = await newResetPassToken.populate(
          "user",
          "name email"
        );
        // console.log("New Reset Password Token : ", newResetPassToken);
        let job = queue
          .create("sendResetPasswordEmail", newResetPassToken)
          .save((err) => {
            if (err) {
              console.log(
                "Error in creating reset-pass-email job in queue...",
                err
              );
              return;
            }

            return;
          });
        req.flash(
          "success",
          "A reset password link has been sent to your email"
        );
        return res.redirect("/users/sign-in");
      } else {
        req.flash("error", "There's some technical issue! Try again...");
        return res.redirect("back");
      }
    }
  } catch (err) {
    console.log("Error in verifying email...", err);
    return;
  }
};

//  Handle Reset Password Form Submission
module.exports.resetPassword = async (req, res) => {
  try {
    const token = await ResetPasswordToken.findOne({
      accessToken: req.query.access_token,
    });

    if (token.isValid) {
      req.flash("success", "Now, carefully reset your password...");
      return res.render("reset_password", {
        title: "Reset Password",
        userId: token.user._id,
      });
    } else {
      req.flash("error", "Sorry you're not authorized to do it now...");
      return res.redirect("/users/verify-email");
    }
  } catch (err) {
    console.log("Error in verifiying the access_token...", err);
    return;
  }
};

// Controller action to update password in DB...
module.exports.updatePassword = async (req, res) => {
  try {
    if (req.body.password1 !== req.body.password2) {
      req.flash(
        "error",
        "Your password and confirm password aren't matching.Try again!!!"
      );
      return res.redirect("back");
    }

    // console.log("user in update password: ", req.params.id);

    let userId = req.params.id;

    let user = await User.findByIdAndUpdate(userId, {
      password: req.body.password1,
    });

    let token = await ResetPasswordToken.findOne({ user: user.id });

    await ResetPasswordToken.findByIdAndUpdate(token.id, {
      isValid: false,
    });

    token = await token.populate("user", "name email password");

    let job = queue.create("successfullPassResetEmail", token).save((err) => {
      if (err) {
        console.log(
          "Error in creating job for sending successfull password reset email...",
          err
        );
        return;
      }
      return;
    });

    // Redirecting to users-sgin-in page  after successful password change..
    req.flash("success", "Your password has been reset successfully!!!!");
    return res.redirect("/users/sign-in");
  } catch (err) {
    console.log("Error in updating your password...", err);
    return;
  }
};
