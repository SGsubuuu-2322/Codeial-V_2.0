const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create = function (req, res) {
  Post.findById(req.body.post)
    .then((post) => {
      if (post) {
        Comment.create({
          content: req.body.content,
          post: req.body.post,
          user: req.user.id,
        })
          .then((comment) => {
            Post.comments.push(comment);
            Post.save();
            return res.redirect("back");
          })
          .catch((err) => {
            console.log(
              "There's some issue in creating a comment in the DB",
              err
            );
            return;
          });
      }
    })
    .catch((err) => {
      console.log(
        "Error in finding the user from DB for saving comment onto it...",
        err
      );
      return;
    });
};
