const Posts = require("../models/post");
const User = require("../models/user");

module.exports.home = async (req, res) => {
  // console.log(req.cookies);
  // res.cookie("user_id", 25);

  // Posts.find({})
  //   .then((posts) => {
  //     return res.render("home", {
  //       title: "Home",
  //       posts: posts,
  //     });
  //   })
  //   .catch((err) => {
  //     console.log("There's some issue in finding the posts from DB...");
  //     return;
  //   });

  try {
    let posts = await Posts.find({})
      .sort("-createdAt")
      .populate("user")
      .populate({
        path: "comments",
        options: {
          sort: {
            createdAt: -1,
          },
        },
        populate: {
          path: "likes",
        },
        populate: {
          path: "user",
        },
      })
      .populate("likes");

    // console.log(posts);

    let users = await User.find({});

    return res.render("home", {
      title: "Home",
      posts: posts,
      all_users: users,
    });
  } catch (err) {
    console.log("Error: ", err);
    return;
  }
};
