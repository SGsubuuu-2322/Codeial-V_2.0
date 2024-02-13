const Posts = require("../models/post");

module.exports.home = function (req, res) {
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

  Posts.find({})
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    })
    .then((posts) => {
      return res.render("home", {
        title: "Home",
        posts: posts,
      });
    })
    .catch((err) => {
      console.log("There's some issue in finding the posts from DB...", err);
      return;
    });
};
