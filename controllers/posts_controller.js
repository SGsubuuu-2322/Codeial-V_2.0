const Post = require("../models/post");
const Comment = require("../models/comment");

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

module.exports.destroy = function (req, res) {
  Post.findById(req.params.id)
    .then((post) => {
      if (post) {
        if (post.user == req.user.id) {
          post.delete();

          Comment.deleteMany({ post: req.params.id }).catch((err) => {
            console.log(
              "Error in deleting all the comments of the post from DB",
              err
            );
            return;
          });

          return res.redirect("back");
        } else {
          return res.redirect("back");
        }
      } else {
        return res.redirect("back");
      }
    })
    .catch((err) => {
      console.log("Error in finding the post by id from DB...", err);
      return;
    });
};
