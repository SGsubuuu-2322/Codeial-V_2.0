const express = require("express");
const router = express.Router();

const userController = require("../controllers/user_controller");

router.get("/profile", userController.profile);
router.get("/sign-in", userController.userSignIn);
router.get("/sign-up", userController.userSignUp);

module.exports = router;
