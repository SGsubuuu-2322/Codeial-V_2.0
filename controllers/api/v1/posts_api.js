module.exports.index = function (req, res) {
  return res.json(200, {
    message: "Lists of posts for v1_api",
    posts: [],
  });
};
