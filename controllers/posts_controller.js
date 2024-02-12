const Post = require("../models/post");

module.exports.create = function (req, res) {
  Post.create({
    content: req.body.content,
    user: req.user.id,
  })
    .then((post) => {
      console.log("Successfully created the post...");
      return res.redirect("back");
    })
    .catch((err) => {
      console.log("There's some error in creating the post in the DB...", err);
      return;
    });
};
