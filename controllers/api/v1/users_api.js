const User = require("../../../models/user");
const jsonWebToken = require("jsonwebtoken");

module.exports.createSession = async function (req, res) {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user || user.password !== req.body.password) {
      return res.json(422, {
        message: "Invalid Username or Password!!!",
      });
    }

    return res.json(200, {
      message:
        "Signed In successfully, here is your token.Please keep it safe...",
      data: {
        token: jsonWebToken.sign(user.toJSON(), "Codeial", {
          expiresIn: "10000",
        }),
      },
    });
  } catch (err) {
    console.log("********Error****: ", err);
    return res.json(500, {
      message: "Internal server damage...",
    });
  }
};
