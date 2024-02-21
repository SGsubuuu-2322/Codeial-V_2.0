const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

let transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "pradhansubham2322@gmail.com",
    pass: "uqjc fgch erap enra",
  },
  // host: "smtp.ethereal.email",
  // port: 587,
  // auth: {
  //   user: "kacie.okon@ethereal.email",
  //   pass: "SqR13KEyycK5WK3zM4",
  // },
});

let renderTemlate = (data, relativePath) => {
  let mailHTML;
  ejs.renderFile(
    path.join(__dirname, "../views/mailers", relativePath),
    data,
    function (err, template) {
      if (err) {
        console.log("Error in creating mail template...", err);
        return;
      }

      mailHTML = template;
    }
  );

  return mailHTML;
};

module.exports = {
  transporter: transporter,
  renderTemlate: renderTemlate,
};
