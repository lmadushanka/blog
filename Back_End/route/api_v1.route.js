const express = require("express");
const userRouter = require("./users/users.route");
const api_v1 = express.Router();

api_v1.use("/user", userRouter);

module.exports = api_v1;
