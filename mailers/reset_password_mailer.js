// const nodeMailer = require("../configs/nodemailer");

// exports.newResetPassEmail = (resetPassToken) => {
// //   console.log(resetPassToken);
//   let htmlString = nodeMailer.renderTemlate(
//     { resetPassToken: resetPassToken },
//     "/reset_pass/reset_pass_email.ejs"
//   );

//   nodeMailer.transporter.sendMail(
//     {
//       from: {
//         name: "Dev_Subuuu",
//         address: "pradhansubham2322@gmail.com",
//       },
//       to: [resetPassToken.user.email],
//       subject: "Link for reset password...",
//       html: htmlString,
//     },
//     (err, info) => {
//       if (err) {
//         console.log("Error in sending reset password link email...", err);
//         return;
//       }
//       console.log("Email-Info: ", info);
//       return;
//     }
//   );
// };
