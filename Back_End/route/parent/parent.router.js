const express = require("express");
const {
  authMiddleware,
  authAdmin,
} = require("../../middleware/auth/auth.middleware");
const {
  registerParent,
  fetchAllParent,
  fetchParentDetail,
  updateParent,
  updateParentStatus,
  deleteParent,
} = require("../../controller/parent/parent.controller");
const parentRouter = express.Router();

parentRouter
  .route("/")
  .post(authMiddleware, registerParent)
  .get(authMiddleware, fetchAllParent);

parentRouter
  .route("/:id")
  .get(authMiddleware, fetchParentDetail)
  .patch(authMiddleware, updateParent)
  .delete(authMiddleware, authAdmin, deleteParent);

parentRouter.route("/status/:id").patch(authMiddleware, updateParentStatus);

module.exports = parentRouter;
