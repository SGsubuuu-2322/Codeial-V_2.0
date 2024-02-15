const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = async (req, res) => {
  try {
    let post = await Post.create({
      content: req.body.content,
      user: req.user.id,
    });

    if (req.xhr) {
      return res.status(200).json({
        data: {
          post: post,
        },
        message: "Post Created!!!",
      });
    }

    req.flash("success", "Post Created Successfully...");
    return res.redirect("back");
  } catch (err) {
    req.flash("error", err);
    return res.redirect("back");
  }
};

module.exports.destroy = async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);

    if (!post) {
      return res.redirect("back");
    } else if (post) {
      if (post.user == req.user.id) {
        await Post.deleteOne({ _id: req.params.id });

        await Comment.deleteMany({ post: req.params.id });
        req.flash(
          "success",
          "Post and its associated comments deleted successfully..."
        );
        return res.redirect("back");
      }
    }
  } catch (err) {
    req.flash("error", err);
    return res.redirect("back");
  }
};
