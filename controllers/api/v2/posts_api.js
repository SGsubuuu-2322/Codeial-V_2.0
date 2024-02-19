const Posts = require("../../../models/post");
const Comments = require("../../../models/comment");

module.exports.index = async function (req, res) {
  let posts = await Posts.find({})
    .sort("createdAt")
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    });

  return res.json(200, {
    message: "Lists of posts for v2_api",
    posts: posts,
  });
};

module.exports.destroy = async (req, res) => {
  try {
    let post = await Posts.findById(req.params.id);

    if (!post) {
      return res.redirect("back");
    } else if (post) {
      // if (post.user == req.user.id) {
      await Posts.deleteOne({ _id: req.params.id });

      await Comments.deleteMany({ post: req.params.id });

      //   if (req.xhr) {
      //     return res.status(200).json({
      //       data: {
      //         post_id: req.params.id,
      //       },
      //       message: "Post and its associated comments deleted successfully...",
      //     });
      //   }

      //   req.flash(
      //     "success",
      //     "Post and its associated comments deleted successfully..."
      //   );
      return res.json(200, {
        message: "Post deleted successfully...",
        posts_id: req.params.id,
      });
    }
    //   }
  } catch (err) {
    //   req.flash("error", err);
    return res.json(500, {
      message: "Internal server damage...",
    });
  }
};
