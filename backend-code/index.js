const express = require("express");
const http = require("http");
const PORT = 3001;

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true,
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

const app = express();

// Root
app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

// All notes
app.get("/api/notes", (req, res) => {
  res.json(notes);
});

// A single note
app.get("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  const note = notes.find((note) => note.id === id);
  if (note) {
    res.json(note);
  } else {
    res.status(404).end("Requested note not found");
  }
});

// Delete a note
app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  notes = notes.filter((note) => note.id !== id);

  res.status(204).send("Note deleted").end();
});

// Server Live
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
