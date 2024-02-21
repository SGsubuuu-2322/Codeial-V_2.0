const nodeMailer = require("../configs/nodemailer");

exports.newComments = (comment) => {
  console.log("Inside comments mailer....", comment);
  nodeMailer.transporter.sendMail(
    {
      from: {
        name: "Dev_Subuuu",
        address: "pradhansubham2322@gmail.com",
      },
      to: [comment.user.email],
      subject:
        "New Comment Published.So send the mail using the nodemailer and gmail...",
      html: "<h1>Yup! your comment is now published....</h1>",
    },
    (err, info) => {
      if (err) {
        console.log("Error in sending mail...", err);
        return;
      }

      console.log("Message sent...", info);
      return;
    }
  );
};
