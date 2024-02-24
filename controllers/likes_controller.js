const Post = require("../models/post");
const Comment = require("../models/comment");
const Like = require("../models/like");

module.exports.toggleLike = async function (req, res) {
  try {
    let likeable;
    let deleted = false;

    // console.log("Id: ", req.query.id);
    // console.log("Type: ", req.query.type);

    if (req.query.type == "Post") {
      likeable = await Post.findById(req.query.id);
    } else {
      likeable = await Comment.findById(req.query.id);
    }

    // console.log("Likeable: ", likeable);

    let existingLike = await Like.findOne({
      user: req.user._id,
      likeable: req.query.id,
      onModel: req.query.type,
    });

    if (existingLike) {
      // console.log("Existing Like id: ", existingLike._id);
      likeable.likes.pull(existingLike._id);
      likeable.save();

      await Like.findByIdAndDelete(existingLike._id);
      deleted = true;

      // console.log("Likeable likes: ", likeable.likes);
    } else {
      let newLike = await Like.create({
        user: req.user._id,
        likeable: req.query.id,
        onModel: req.query.type,
      });

      // console.log("newLike: ", newLike);
      // console.log("Likeable Like: ", likeable.likes);

      likeable.likes.push(newLike._id);
      likeable.save();
      // console.log("Likeable Like: ", likeable.likes);
    }

    return res.status(200).json({
      message: "Request Successfull...",
      data: {
        deleted: deleted,
      },
    });
  } catch (err) {
    if (("Error in manipulating the likes...", err));
    return res.status(500).json({
      message: "Internal server error...",
    });
  }
};
