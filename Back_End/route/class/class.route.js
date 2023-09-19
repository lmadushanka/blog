const express = require("express");
const {
  fetchAllClasses,
  createClass,
  fetchClassDetails,
  updateClass,
  updateClassStatus,
  deleteClass,
  fetchClassRoomsByGrade,
} = require("../../controller/class/class.controller");

const {
  authMiddleware,
  authAdmin,
} = require("../../middleware/auth/auth.middleware");

const classRoute = express.Router();

classRoute
  .route("/")
  .get(authMiddleware, authAdmin, fetchAllClasses)
  .post(authMiddleware, authAdmin, createClass);
classRoute
  .route("/:id")
  .get(authMiddleware, authAdmin, fetchClassDetails)
  .patch(authMiddleware, authAdmin, updateClass)
  .delete(authMiddleware, authAdmin, deleteClass);
classRoute
  .route("/status/:id")
  .patch(authMiddleware, authAdmin, updateClassStatus);
classRoute
  .route("/grade/:grade")
  .get(authMiddleware, authAdmin, fetchClassRoomsByGrade);

module.exports = classRoute;
