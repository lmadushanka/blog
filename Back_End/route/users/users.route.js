const express = require("express");
const {
  userRegisterController,
  getAllUsersController,
  loginUserController,
  deleteUserController,
  getUserDetailsController,
  userProfileController,
  updateUserProfileController,
  updatePasswordController,
} = require("../../controller/users/users.controller");
const { authMiddleware } = require("../../middleware/auth/auth.middleware");
const userRouter = express.Router();

userRouter
  .route("/")
  .post(userRegisterController)
  .get(authMiddleware, getAllUsersController);
userRouter
  .route("/:id")
  .delete(authMiddleware, deleteUserController)
  .get(authMiddleware, getUserDetailsController)
  .patch(authMiddleware, updateUserProfileController);
userRouter.route("/login").post(loginUserController);
userRouter.route("/profile/:id").get(authMiddleware, userProfileController);
userRouter
  .route("/password/:id")
  .patch(authMiddleware, updatePasswordController);

module.exports = userRouter;
