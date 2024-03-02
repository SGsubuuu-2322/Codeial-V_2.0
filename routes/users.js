// Importing express for creating routers in user router file...
const express = require("express");
//  Creating a new instance of the express.Router() method to create separate route handlers.
const router = express.Router();
// Requiring passport  for authentication middleware.
const passport = require("passport");

// Bringing user controller for using  its methods inside this router file, with specific routes
const userController = require("../controllers/user_controller");

// Defining the user profile route with passport check-authentication middleware...
router.get(
  "/profile/:id",
  passport.checkAuthentication,
  userController.profile
);

// Defining the update user profile route with authentication....
router.post(
  "/update/:id",
  passport.checkAuthentication,
  userController.updateProfile
);

// Defining sign-in route for user to be signed in
router.get("/sign-in", userController.userSignIn);

// Defining sign-up route for user to be signed up
router.get("/sign-up", userController.userSignUp);

// Defining the create route for user to be created...
router.post("/create", userController.create);

// Defining  the login process with passport authenticate middleware
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/sign-in" }),
  userController.createSession
);

// Defining  logout route that destroys session and redirects to home page..
router.get("/sign-out", userController.destroySession);

// Defining the sign-in with google route
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
// And after the google authentication its the callback route to be executed...
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/users/sign-in" }),
  userController.createSession
);

// Defining reset-password routes for  users to reset their password
router.get("/forgot-password", userController.forgotPassword);
router.post("/verify-email", userController.verifyEmail);
router.get("/reset-password", userController.resetPassword);
router.post("/update-password/:id", userController.updatePassword);

// And, finally exporting these router file to be called from index.js file...
module.exports = router;
