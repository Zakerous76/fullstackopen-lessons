const express = require("express");
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
app.use(express.json());

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};
app.use(requestLogger);

const generateID = () => {
  const maxId =
    notes.length > 0 ? Math.max(...notes.map((n) => Number(n.id))) : 0;
  return String(maxId + 1);
};

// #ROUTES

// Root
app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

// GET All notes
app.get("/api/notes", (req, res) => {
  res.json(notes);
});

// GET A single note
app.get("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  const note = notes.find((note) => note.id === id);
  if (note) {
    res.json(note);
  } else {
    res.status(404).end("Requested note not found");
  }
});

// DELETE a note
app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  notes = notes.filter((note) => note.id !== id);
  console.log(notes);
  res.status(204).send("Note deleted").end();
});

// CREATE a note
app.post("/api/notes", (req, res) => {
  const body = req.body;

  if (!body.content) {
    res.status(400).json({
      error: "content missing",
    });
  } else {
    const note = {
      content: body.content,
      important: body.important || false,
      id: generateID(),
    };
    notes = notes.concat(note);
    console.log(notes);
    res.json(note);
  }
});

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

// Server Live
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
