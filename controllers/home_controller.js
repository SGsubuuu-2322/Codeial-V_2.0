const Posts = require("../models/post");
const User = require("../models/user");

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
      User.find({})
        .then((users) => {
          return res.render("home", {
            title: "Home",
            posts: posts,
            all_users: users,
          });
        })
        .catch((err) => {
          console.log("There's some error in finding all the users...", err);
          return;
        });
    })
    .catch((err) => {
      console.log("There's some issue in finding the posts from DB...", err);
      return;
    });
};
