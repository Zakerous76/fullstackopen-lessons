const notesRouter = require("express").Router();
const Note = require("../models/note");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

notesRouter.get("/", async (request, response) => {
  const notes = await Note.find({}).populate("user");
  response.json(notes);
});

notesRouter.get("/:id", async (request, response, next) => {
  try {
    const note = await Note.findById(request.params.id);
    if (note) {
      response.json(note);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer")) {
    return authorization.replace("Bearer ", "").trim();
  }
  return null;
};

notesRouter.post("/", async (request, response, next) => {
  const body = request.body;

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  const user = await User.findById(decodedToken.id);
  if (!user) {
    return response.status(400).json({ error: "userId missing or not valid" });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    user: user._id,
  });

  try {
    const savedNote = await note.save();
    user.notes = user.notes.concat(savedNote._id);
    await user.save();
    response.status(201).json(savedNote);
  } catch (error) {
    next(error);
  }
});

notesRouter.delete("/:id", async (request, response, next) => {
  const id = request.params.id;
  try {
    await Note.findByIdAndDelete(id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

notesRouter.put("/:id", async (request, response, next) => {
  const id = request.params.id;
  const newNote = request.body;
  const opts = { runValidators: true, returnDocument: "after" };
  try {
    const result = await Note.findByIdAndUpdate(id, newNote, opts);
    if (result) {
      response.status(200).json(result);
    } else {
      response.status(404).end("note not found");
    }
  } catch (error) {
    console.log("error at: /notes.js PUT method");
    next(error);
  }
});

module.exports = notesRouter;
