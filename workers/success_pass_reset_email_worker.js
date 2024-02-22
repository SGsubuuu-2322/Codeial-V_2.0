const queue = require("../configs/kue");

const successPassResetmailer = require("../mailers/success_pass_reset_mailer");

queue.process("successfullPassResetEmail", (job, done) => {
  successPassResetmailer.newSuccessPassEmail(job.data);

  done();
});
