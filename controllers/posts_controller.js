const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = async (req, res) => {
  try {
    await Post.create({
      content: req.body.content,
      user: req.user.id,
    });
    return res.redirect("back");
  } catch (err) {
    console.log("Error: ", err);
    return;
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
        return res.redirect("back");
      }
    }
  } catch (err) {
    console.log("Error: ", err);
    return;
  }
};
