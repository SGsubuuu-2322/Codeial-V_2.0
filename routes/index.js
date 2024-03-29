const express = require("express");
const router = express.Router();

const homeController = require("../controllers/home_controller");

router.get("/", homeController.home);
router.use("/users", require("./users"));
router.use("/posts", require("./posts"));
router.use("/comments", require("./comments"));
router.use("/likes", require("./like"));
router.use("/friend", require("./friends"));

router.use("/api", require("./api"));

console.log("Routers Loaded...");
module.exports = router;
