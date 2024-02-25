const express = require("express");
const router = express.Router();

const friendshipController = require("../controllers/friends_controller");

router.get("/toggle-friendship/:id", friendshipController.toggleFriendship);

module.exports = router;
