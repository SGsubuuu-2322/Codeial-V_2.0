const User = require("../../../models/user");
const jsonWebToken = require("jsonwebtoken");

module.exports.createSession = async function (req, res) {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user || user.password !== req.body.password) {
      return res.status(422).json({
        message: "Invalid Username or Password!!!",
      });
    }

    return res.status(200).json({
      message:
        "Signed In successfully, here is your token.Please keep it safe...",
      data: {
        token: jsonWebToken.sign(user.toJSON(), "Codeial", {
          expiresIn: "100000",
        }),
      },
    });
  } catch (err) {
    console.log("********Error****: ", err);
    return res.status(500).json({
      message: "Internal server damage...",
    });
  }
};
