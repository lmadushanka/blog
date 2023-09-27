const express = require("express");
const userRouter = require("./users/users.route");
const classRoute = require("./class/class.route");
const subjectRouter = require("./subject/subject.router");
const parentRouter = require("./parent/parent.router");
const studentRouter = require("./student/student.route");
const teacherRouter = require("./teacher/teacher.route");
const timeTableRouter = require("./timeTable/timeTable.route");
const api_v1 = express.Router();

api_v1.use("/user", userRouter);
api_v1.use("/class", classRoute);
api_v1.use("/subject", subjectRouter);
api_v1.use("/parent", parentRouter);
api_v1.use("/student", studentRouter);
api_v1.use("/teacher", teacherRouter);
api_v1.use("/timetable", timeTableRouter);

module.exports = api_v1;
