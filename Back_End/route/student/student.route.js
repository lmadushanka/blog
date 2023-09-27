const express = require("express");
const {
  authMiddleware,
  authAdmin,
} = require("../../middleware/auth/auth.middleware");
const {
  registerStudent,
  fetchAllStudent,
  fetchStudentDetail,
  fetchStudentByClass,
  updateStudent,
  deleteStudent,
  updateStudentStatus,
} = require("../../controller/student/student.controller");
const studentRouter = express.Router();

studentRouter
  .route("/")
  .post(authMiddleware, registerStudent)
  .get(authMiddleware, fetchAllStudent);
studentRouter
  .route("/:id")
  .get(authMiddleware, fetchStudentDetail)
  .patch(authMiddleware, updateStudent)
  .delete(authMiddleware, deleteStudent);
studentRouter.route("/class/:classId").get(authMiddleware, fetchStudentByClass);
studentRouter.route("/status/:id").patch(authMiddleware, updateStudentStatus);
module.exports = studentRouter;
