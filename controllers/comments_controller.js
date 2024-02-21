const Comment = require("../models/comment");
const Post = require("../models/post");
const commentsMailer = require("../mailers/comments_mailer");

module.exports.create = async (req, res) => {
  try {
    let post = await Post.findById(req.body.post);

    if (post) {
      let comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user.id,
      });

      post.comments.push(comment);
      post.save();
      comment = await comment.populate("user", "name email");
      commentsMailer.newComments(comment);

      if (req.xhr) {
        return res.status(200).json({
          data: {
            comment: comment,
          },
          message: "Comment published successfully!!!",
        });
      }

      req.flash("success", "Comment published successfully...");
      return res.redirect("back");
    }
  } catch (err) {
    req.flash("error", err);
    return;
  }
};

module.exports.destroy = async (req, res) => {
  try {
    let comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.redirect("back");
    } else if (comment) {
      if (req.user.id == comment.user) {
        const postID = comment.post;

        await Comment.deleteOne({ _id: req.params.id });

        await Post.findByIdAndUpdate(postID, {
          $pull: { comments: req.params.id },
        });

        if (req.xhr) {
          return res.status(200).json({
            data: {
              commentId: req.params.id,
            },
            message: "Comment deleted successfully...",
          });
        }

        req.flash("success", "Comment deleted successfully...");

        return res.redirect("back");
      } else {
        return res.redirect("back");
      }
    }
  } catch (err) {
    req.flash("error", err);
    return;
  }
};
