const Comment = require("../models/comment");
const Post = require("../models/post");
// const Like = require("../models/like");
const commentsMailer = require("../mailers/comments_mailer");
const queue = require("../configs/kue");
const commentEmailWorker = require("../workers/comment_email_worker");

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
      // console.log("new Comment: ", comment);
      // commentsMailer.newComments(comment);
      let job = queue.create("emails", comment).save((err) => {
        if (err) {
          console.log("Error in sending the email job to the queue...", err);
          return;
        }

        // console.log("Job enqueued: ", job.id);
        return;
      });

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

        // await Like.deleteMany({ likeable: comment, onModel: "Comment" });

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
