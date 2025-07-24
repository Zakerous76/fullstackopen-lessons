const mongoose = require("mongoose");
const Note = require("../models/note");
const logger = require("./logger");

const MONGODB_URI =
  "mongodb+srv://fullstackopen:GLp2YSRwBgoW0Y3b@cluster0.ilombjs.mongodb.net/testNoteApp?retryWrites=true&w=majority&appName=Cluster0";

const content = process.argv[2];
const important = process.argv[3] === "true" ? true : false;

logger.info("Connecting to DB (independently)");
mongoose.set("strictQuery", false);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    newNote
      .save()
      .then((res) => {
        logger.info(res);
        mongoose.connection.close();
      })
      .catch((error) => logger.error(error));
  })
  .catch((error) => logger.error(error));

const newNote = new Note({ content, important });
