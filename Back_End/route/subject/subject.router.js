const express = require("express");
const {
  authMiddleware,
  authAdmin,
} = require("../../middleware/auth/auth.middleware");
const {
  createSubject,
  fetchAllSubject,
  fetchSubjectDetails,
  fetchSubjectsByLanguage,
  updateSubject,
  updateSubjectStatus,
  deleteSubject,
} = require("../../controller/subject/subject.controller");
const subjectRouter = express.Router();

subjectRouter
  .route("/")
  .post(authMiddleware, authAdmin, createSubject)
  .get(authMiddleware, authAdmin, fetchAllSubject);
subjectRouter
  .route("/:id")
  .get(authMiddleware, authAdmin, fetchSubjectDetails)
  .patch(authMiddleware, authAdmin, updateSubject)
  .delete(authMiddleware, authAdmin, deleteSubject);
subjectRouter
  .route("/language/:language")
  .get(authMiddleware, authAdmin, fetchSubjectsByLanguage);
subjectRouter
  .route("/status/:id")
  .patch(authMiddleware, authAdmin, updateSubjectStatus);

module.exports = subjectRouter;
