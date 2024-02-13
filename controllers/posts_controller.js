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
      if (!post) {
        return res.redirect("/");
      } else if (post) {
        if (post.user == req.user.id) {
          Post.deleteOne({ _id: req.params.id })
            .then(() => {
              console.log("Post deleted successfully...");
            })
            .catch((err) => {
              console.log(
                "There's some error in deleting the post from DB...",
                err
              );
              return;
            });

          Comment.deleteMany({ post: req.params.id })
            .then(() => {
              console.log(
                "Comments related to the post also deleted successfully..."
              );
            })
            .catch((err) => {
              console.log(
                "There's some issue in deleting the comments related to the post from DB...",
                err
              );
              return;
            });

          return res.redirect("/");
        }
      } else {
        return res.redirect("/");
      }
    })
    .catch((err) => {
      console.log("There's some issue in finding the post from DB", err);
      return;
    });
};
