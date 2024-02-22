// const nodeMailer = require("../configs/nodemailer");

// exports.newSuccessPassEmail = (successPassToken) => {
//   let htmlString = nodeMailer.renderTemlate(
//     {
//       successPassToken: successPassToken,
//     },
//     "/success_reset_pass/success_reset_pass_email.ejs"
//   );

//   nodeMailer.transporter.sendMail(
//     {
//       from: {
//         name: "Dev_Subuuu",
//         address: "pradhansubham2322@gmail.com",
//       },
//       to: [successPassToken.user.email],
//       subject: "Successfull Password Reset!!!",
//       html: htmlString,
//     },
//     (err, info) => {
//       if (err) {
//         console.log(
//           "Error in sending the email for successfull Password Reset...",
//           err
//         );
//         return;
//       }
//       console.log("Email_Info: ", info);
//       return;
//     }
//   );
// };
