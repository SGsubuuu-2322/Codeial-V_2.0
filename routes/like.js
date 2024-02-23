const express = require("express");
const router = express.Router();

const likeController = require("../controllers/likes_controller");

app.post("/toggle", likeController.toggleLike);

module.exports = router;
