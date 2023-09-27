const express = require("express");
const {
  authMiddleware,
  authAdmin,
} = require("../../middleware/auth/auth.middleware");
const {
  createTimetable,
  fetchAllTimetable,
  fetchTimetableDetails,
  fetchTimetableByClass,
  updateTimetable,
  fetchStudentTimetable,
} = require("../../controller/timetable/timetable.controller");
const timeTableRouter = express.Router();

timeTableRouter
  .route("/")
  .post(authMiddleware, createTimetable)
  .get(authMiddleware, fetchAllTimetable);
timeTableRouter
  .route("/:id")
  .get(authMiddleware, fetchTimetableDetails)
  .patch(authMiddleware, updateTimetable);
timeTableRouter
  .route("/class/:classId")
  .get(authMiddleware, fetchTimetableByClass);
timeTableRouter
  .route("/student/:classId")
  .get(authMiddleware, fetchStudentTimetable);

module.exports = timeTableRouter;
