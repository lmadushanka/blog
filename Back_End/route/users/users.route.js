const express = require("express");
const {
  userRegisterController,
  getAllUsers,
} = require("../../controller/users/users.controller");
const userRouter = express.Router();

userRouter.route("/").post(userRegisterController).get(getAllUsers);

module.exports = userRouter;
