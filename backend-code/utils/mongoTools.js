const mongoose = require("mongoose");
const logger = require("./logger");
const config = require("./config");
// const Note = require("../models/note");

// const MONGODB_URI =
//   "mongodb+srv://fullstackopen:GLp2YSRwBgoW0Y3b@cluster0.ilombjs.mongodb.net/testNoteApp?retryWrites=true&w=majority&appName=Cluster0";

// const content = process.argv[2];
// const important = process.argv[3] === "true" ? true : false;

// logger.info("Connecting to DB (independently)");
// mongoose.set("strictQuery", false);

// mongoose
//   .connect(MONGODB_URI)
//   .then(() => {
//     newNote
//       .save()
//       .then((res) => {
//         logger.info(res);
//         mongoose.connection.close();
//       })
//       .catch((error) => logger.error(error));
//   })
//   .catch((error) => logger.error(error));

// const newNote = new Note({ content, important });

const connectToDB = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI);
    logger.info("Connected to MongoDB");
  } catch (error) {
    logger.error("Error connecting to MongoDB:", error.message);
  }
};

module.exports = { connectToDB };
