const Posts = require("../../../models/post");
const Comments = require("../../../models/comment");

module.exports.index = async function (req, res) {
  console.log("Its running successfully...");

  let posts = await Posts.find({})
    .sort("createdAt")
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    });

  return res.status(200).json({
    message: "Lists of posts for v2_api",
    posts: posts,
  });
};

module.exports.destroy = async (req, res) => {
  try {
    let post = await Posts.findById(req.params.id);

    if (post) {
      if (post.user == req.user.id) {
        await Posts.deleteOne({ _id: req.params.id });

        await Comments.deleteMany({ post: req.params.id });
        return res.status(200).json({
          message: "Post deleted successfully...",
          posts_id: req.params.id,
        });
      } else {
        return res.status(401).json({
          message: "Your aren't authorized to delete this post...",
        });
      }
    }
  } catch (err) {
    //   req.flash("error", err);
    console.log("*******Error********: ", err);
    return res.status(500).json({
      message: "Internal server damage...",
    });
  }
};
