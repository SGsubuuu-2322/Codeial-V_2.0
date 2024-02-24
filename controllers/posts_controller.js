const Post = require("../models/post");
const Comment = require("../models/comment");
const Like = require("../models/like");

module.exports.create = async (req, res) => {
  try {
    let post = await Post.create({
      content: req.body.content,
      user: req.user.id,
    });

    if (req.xhr) {
      post = await post.populate("user", "name");
      return res.status(200).json({
        data: {
          post: post,
        },
        message: "Post Created Successfully!!!",
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
    // post = await post.populate("comments");

    if (!post) {
      return res.redirect("back");
    } else if (post) {
      if (post.user == req.user.id) {
        // console.log("Post comments array: ", post.comments);
        await Like.deleteMany({ likeable: post, onModel: "Post" });
        await Like.deleteMany({ likeable: { $in: post.comments } });

        await Post.deleteOne({ _id: req.params.id });
        await Comment.deleteMany({ post: req.params.id });

        if (req.xhr) {
          return res.status(200).json({
            data: {
              post_id: req.params.id,
            },
            message: "Post and its associated comments deleted successfully...",
          });
        }

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
