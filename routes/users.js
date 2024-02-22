const express = require("express");
const router = express.Router();
const passport = require("passport");

const userController = require("../controllers/user_controller");

router.get(
  "/profile/:id",
  passport.checkAuthentication,
  userController.profile
);
router.post(
  "/update/:id",
  passport.checkAuthentication,
  userController.updateProfile
);
router.get("/sign-in", userController.userSignIn);
router.get("/sign-up", userController.userSignUp);
router.post("/create", userController.create);
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/sign-in" }),
  userController.createSession
);

router.get("/sign-out", userController.destroySession);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/users/sign-in" }),
  userController.createSession
);

router.get("/forgot-password", userController.forgotPassword);
router.post("/verify-email", userController.verifyEmail);
// router.get("/reset-password", userController.resetPassword);
// router.post("/update-password/:id", userController.updatePassword);

module.exports = router;
