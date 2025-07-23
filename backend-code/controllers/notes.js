const notesRouter = require("express").Router();
const NoteModel = require("../models/note");

notesRouter.get("/", (request, response) => {
  NoteModel.find({}).then((notes) => {
    response.json(notes);
  });
});

notesRouter.get("/:id", (request, response, next) => {
  NoteModel.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

notesRouter.post("/", (request, response, next) => {
  const body = request.body;

  const note = new NoteModel({
    content: body.content,
    important: body.important || false,
  });

  note
    .save()
    .then((savedNote) => {
      response.json(savedNote);
    })
    .catch((error) => next(error));
});

notesRouter.delete("/:id", (request, response, next) => {
  const id = request.params.id;
  NoteModel.findByIdAndDelete(id)
    .then(() => response.status(204).end())
    .catch((error) => next(error));
});

const opts = { runValidators: true, returnDocument: "after" };
notesRouter.put("/:id", (request, response, next) => {
  const id = request.params.id;
  const newNote = request.body;
  NoteModel.findByIdAndUpdate(id, newNote, opts)
    .then((result) => {
      if (result) {
        response.status(200).json(result);
      } else {
        response.status(404).end("note not found");
      }
    })
    .catch((error) => next(error));
});

module.exports = notesRouter;
