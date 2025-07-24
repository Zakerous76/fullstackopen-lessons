const note = require("../models/note");
const Note = require("../models/note");
const User = require("../models/user");

const initialNotesRaw = [
  {
    content: "HTML is easy",
    important: false,
  },
  {
    content: "Browser can execute only JavaScript",
    important: true,
  },
];

const prepInitialNotes = (userId) => {
  return initialNotesRaw.map((note) => ({ ...note, user: userId }));
};

const nonExistingId = async () => {
  const note = new Note({ content: "willremovethissoon" });
  await note.save();
  await note.deleteOne();

  return note._id.toString();
};

const notesInDb = async () => {
  const notes = await Note.find({});
  return notes.map((note) => note.toJSON());
};

const usersInDB = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

const extractUserId = async () => {
  const user = new User({
    username: "testUser",
    name: "jeff",
    password: "my name is jeff",
  });

  const newUser = await user.save();
  return newUser.id.toString();
};

module.exports = {
  prepInitialNotes,
  nonExistingId,
  notesInDb,
  usersInDB,
  extractUserId,
};
