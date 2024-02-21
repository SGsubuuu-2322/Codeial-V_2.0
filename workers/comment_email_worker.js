const queue = require("../configs/kue");

const commentsMailer = require("../mailers/comments_mailer");

queue.process("emails", (job, done) => {
  console.log("Emails worker is processing the emails...", job.data);

  commentsMailer.newComments(job.data);

  done();
});
