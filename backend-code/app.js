const express = require("express");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
const notesRouter = require("./controllers/notes");
const usersRouter = require("./controllers/users");
const connectToDB = require("./utils/mongoTools").connectToDB;
const loginRouter = require("./controllers/login");

const app = express();

logger.info("Connecting to DB...");
connectToDB();

app.use(express.json());
// Serving static Files
app.use(express.static("dist"));
app.use(middleware.requestLogger);

// ### ROUTES
app.use("/api/login", loginRouter);
app.use("/api/notes", notesRouter);
app.use("/api/users", usersRouter);

// Catch the rest of the endpoints
app.use(middleware.unknownEndpoint);

// Error Handler
app.use(middleware.errorHandler);

module.exports = app;
