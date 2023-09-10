//import modules
const express = require("express");
const morgan = require("morgan");
require("express-async-errors");

const api_v1 = require("./route/api_v1.route.js");

//Import Middleware
const notFoundMiddleware = require("./middleware/not-found.js");
const errorHandlerMiddleware = require("./middleware/error-handler.js");

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1", api_v1);

//notFound middleware
app.use(notFoundMiddleware);

//errorHandler Middleware
app.use(errorHandlerMiddleware);

module.exports = app;
