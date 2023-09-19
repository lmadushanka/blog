const express = require("express");
const userRouter = require("./users/users.route");
const classRoute = require("./class/class.route");
const subjectRouter = require("./subject/subject.router");
const parentRouter = require("./parent/parent.router");
const api_v1 = express.Router();

api_v1.use("/user", userRouter);
api_v1.use("/class", classRoute);
api_v1.use("/subject", subjectRouter);
api_v1.use("/parent", parentRouter);

module.exports = api_v1;
