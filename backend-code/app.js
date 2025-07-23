const express = require("express");
const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
const notesRouter = require("./controllers/notes");

const app = express();

logger.info("Connecting to DB...");
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.log("Connected to MongoDB");
  })
  .catch((error) => {
    logger.log("Error connecting to MongoDB: ", error.message);
  });

app.use(express.json());
// Serving static Files
app.use(express.static("dist"));
app.use(middleware.requestLogger);

// ### ROUTES
app.use("/api/notes", notesRouter);

// Catch the rest of the endpoints
app.use(middleware.unknownEndpoint);

// Error Handler
app.use(middleware.errorHandler);

module.exports = app;
