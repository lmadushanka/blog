const express = require("express");
const {
  authMiddleware,
  authAdmin,
} = require("../../middleware/auth/auth.middleware");
const {
  registerTeacher,
  fetchAllTeachers,
  fetchTeacherDetails,
  updateTeacher,
  updateTeacherStatus,
  deleteTeacher,
} = require("../../controller/teacher/teacher.controller");
const teacherRouter = express.Router();

teacherRouter
  .route("/")
  .post(authMiddleware, registerTeacher)
  .get(authMiddleware, fetchAllTeachers);

teacherRouter
  .route("/:id")
  .get(authMiddleware, fetchTeacherDetails)
  .patch(authMiddleware, updateTeacher)
  .delete(authMiddleware, deleteTeacher);

teacherRouter
  .route("/status/:id/:isActive")
  .patch(authMiddleware, updateTeacherStatus);

module.exports = teacherRouter;
