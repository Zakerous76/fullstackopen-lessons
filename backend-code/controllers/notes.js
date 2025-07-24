const notesRouter = require("express").Router();
const NoteModel = require("../models/note");
const { error } = require("../utils/logger");

notesRouter.get("/", async (request, response) => {
  const notes = await NoteModel.find({});
  response.json(notes);
});

notesRouter.get("/:id", async (request, response, next) => {
  try {
    const note = await NoteModel.findById(request.params.id);
    if (note) {
      response.json(note);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

notesRouter.post("/", async (request, response, next) => {
  const body = request.body;

  const note = new NoteModel({
    content: body.content,
    important: body.important || false,
  });

  try {
    const savedNote = await note.save();
    response.status(201).json(savedNote);
  } catch (error) {
    next(error);
  }
});

notesRouter.delete("/:id", async (request, response, next) => {
  const id = request.params.id;
  try {
    await NoteModel.findByIdAndDelete(id);
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
    const result = await NoteModel.findByIdAndUpdate(id, newNote, opts);
    if (result) {
      response.status(200).json(result);
    } else {
      response.status(404).end("note not found");
    }
  } catch (error) {
    next(error);
  }
});

module.exports = notesRouter;
