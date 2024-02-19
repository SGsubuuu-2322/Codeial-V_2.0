module.exports.index = function (req, res) {
  return res.json(200, {
    message: "Lists of posts",
    posts: [],
  });
};
