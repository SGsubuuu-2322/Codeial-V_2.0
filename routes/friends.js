const express = require("express");
const passport = require("passport");
const router = express.Router();

const friendshipController = require("../controllers/friends_controller");

router.get(
  "/toggle-friendship/:id",
  passport.checkAuthentication,
  friendshipController.toggleFriendship
);

module.exports = router;
