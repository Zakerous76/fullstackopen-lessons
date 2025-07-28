require("dotenv").config();

const PORT = process.env.PORT || 3001;

const MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

if (process.env.NODE_ENV === "test") {
  console.log("TEST ENV DETECTED");
  console.log("PORT:", process.env.PORT);
  console.log("TEST_MONGODB_URI:", process.env.TEST_MONGODB_URI);
}

module.exports = { MONGODB_URI, PORT };
