const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as an argument");
  process.exit(1);
}

const password = process.argv[2];
const collectionName = "noteApp";

const url = `mongodb+srv://fullstackopen:${password}@cluster0.ilombjs.mongodb.net/${collectionName}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

const createNote = (NoteModel, content) => {
  const note = new NoteModel({
    content: content,
    important: true,
  });

  note.save().then((res) => {
    console.log("note saved!");
    console.log("res:", res);
  });
};

const findAll = (NoteModel) => {
  return NoteModel.find({}).then((res) => {
    console.log("res,", res);
    res.forEach((note) => {
      console.log("note: ", note);
    });
  });
};

createNote(Note, "My name is jeff");
createNote(Note, "My name is Mongoose");
findAll(Note).then((r) => {
  mongoose.connection.close();
});
