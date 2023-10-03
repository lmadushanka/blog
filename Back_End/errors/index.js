const BadRequestError = require("./bad-request.js");
const NotFoundError = require("./not-found.js");
const UnAuthenticatedError = require("./unAuthenticated.js");
const ServerError = require("./server-error.js");

module.exports = {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
  ServerError,
};
