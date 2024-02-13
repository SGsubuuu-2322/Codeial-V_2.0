const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create = async (req, res) => {
  try {
    let post = await Post.findById(req.body.post);

    let comment = await Comment.create({
      content: req.body.content,
      post: req.body.post,
      user: req.user.id,
    });

    post.comments.push(comment);
    post.save();
    return res.redirect("back");
  } catch (err) {
    console.log("Error: ", err);
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

        let cmt = await Comment.deleteOne({ _id: req.params.id });

        let post = await Post.findByIdAndUpdate(postID, {
          $pull: { comments: req.params.id },
        });
        return res.redirect("back");
      } else {
        return res.redirect("back");
      }
    }
  } catch (err) {
    console.log("Error: ", err);
    return;
  }
};
