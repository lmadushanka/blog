//import modules
const express = require("express");
const morgan = require("morgan");
const notFoundMiddleware = require("./middleware/not-found.js");
const errorHandlerMiddleware = require("./middleware/error-handler.js");
require("express-async-errors");
const api_v1 = require("./route/api_v1.route.js");

const app = express();

app.use(morgan("dev"));
app.use(express.json());

//Route version 1
app.use("/api/v1", api_v1);

//notFound middleware
app.use(notFoundMiddleware);

//errorHandler Middleware
app.use(errorHandlerMiddleware);

module.exports = app;
