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
            post.comments.push(comment);
            post.save();
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

module.exports.destroy = function (req, res) {
  Comment.findById(req.params.id)
    .then((comment) => {
      if (!comment) {
        return res.redirect("back");
      } else if (comment) {
        if (req.user.id == comment.user) {
          const postID = comment.post;

          Comment.deleteOne({ _id: req.params.id })
            .then(() => {
              console.log("Comment deleted successfully...");
            })
            .catch((err) => {
              console.log("Error in deleting the comment from DB...", err);
              return;
            });

          Post.findByIdAndUpdate(postID, {
            $pull: { comments: req.params.id },
          })
            .then((post) => {
              console.log(
                "Updated the post after removing the comment from comments array..."
              );
              return res.redirect("back");
            })
            .catch((err) => {
              console.log(
                "Error in finding post and updating its comments array...",
                err
              );
              return;
            });
        }
      }
    })
    .catch((err) => {
      console.log("Error in finding the comment from DB...".err);
      return;
    });
};
