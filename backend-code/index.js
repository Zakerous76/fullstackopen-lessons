require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Note = require("./models/note");

const app = express();
const PORT = process.env.PORT;
app.use(express.json());
// Serving static Files
app.use(express.static("dist"));

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};
app.use(requestLogger);

// ### HELPER FUNCTIONS

const generateID = () => {
  const maxId =
    notes.length > 0 ? Math.max(...notes.map((n) => Number(n.id))) : 0;
  return String(maxId + 1);
};

// ### ROUTES

// Root
app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

// GET All notes
app.get("/api/notes", (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

// GET A single note
app.get("/api/notes/:id", (req, res, next) => {
  const reqId = req.params.id;

  // if (!mongoose.Types.ObjectId.isValid(reqId)) {
  //   return res.status(400).json({ error: "Invalid note ID" });
  // }

  Note.findById(reqId)
    .then((note) => {
      console.log(note);
      // If no matching object is found in the database, the value of note will be null
      if (note) {
        res.json(note);
      } else {
        res.status(404).end("Requested note not found");
      }
    })
    .catch((error) => {
      next(error);

      // res.status(500).json({ error: "Server error", details: error.message });
    });
});

// DELETE a note
app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  Note.findByIdAndDelete(id).then((result) => {
    res.status(204).end();
  });
});

// CREATE a note
app.post("/api/notes", (req, res) => {
  const body = req.body;

  if (!body.content) {
    res.status(400).json({
      error: "content missing",
    });
  } else {
    const note = new Note({
      content: body.content,
      important: body.important || false,
    });
    note.save().then((savedNote) => {
      console.log("savedNote:", savedNote);
      res.status(201).json(savedNote);
    });
  }
});

app.put("/api/notes/:id", (request, response, next) => {
  const { content, important } = request.body;
  Note.findById(request.params.id)
    .then((note) => {
      if (!note) {
        return response.status(404).end();
      }
      note.content = content;
      note.important = important;

      return note.save().then((updatedNote) => {
        response.json(updatedNote);
      });
    })
    .catch((error) => next(error));
});

// Catch the rest of the endpoints
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

// Error Handler
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

// Server Live
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
