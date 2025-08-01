const assert = require("node:assert");
const { test, after, beforeEach, describe } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const Note = require("../models/note");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const api = supertest(app);

// Notes test
describe("Notes test: when there is initially some notes saved", async () => {
  await User.deleteMany({});
  const userId = await helper.extractUserId();
  const initialNotes = helper.prepInitialNotes(userId);
  beforeEach(async () => {
    await Note.deleteMany({});
    await Note.insertMany(initialNotes);
  });
  describe("viewing all notes", () => {
    test("notes are returned as json", async () => {
      await api
        .get("/api/notes")
        .expect(200)
        .expect("Content-Type", /application\/json/);
    });

    test("all notes are returned", async () => {
      const response = await api.get("/api/notes");

      assert.strictEqual(response.body.length, initialNotes.length);
    });
  });

  describe("viewing a specific note", () => {
    test("a specific note is within the returned notes", async () => {
      const response = await api.get("/api/notes");

      const contents = response.body.map((e) => e.content);
      assert(contents.includes("HTML is easy"));
    });
    test("succeeds with a valid id", async () => {
      const notesAtStart = await helper.notesInDb();
      const noteToView = notesAtStart[0];

      const expectedNote = {
        ...noteToView,
        user: noteToView.user.toString(),
      };

      const resultNote = await api
        .get(`/api/notes/${noteToView.id}`)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      assert.deepStrictEqual(resultNote.body, expectedNote);
    });

    test("fails with statuscode 404 if note does not exist", async () => {
      const validNonexistingId = await helper.nonExistingId();

      await api.get(`/api/notes/${validNonexistingId}`).expect(404);
    });

    test("fails with statuscode 400 id is invalid", async () => {
      const invalidId = "5a3d5da59070081a82a3445";

      await api.get(`/api/notes/${invalidId}`).expect(400);
    });
  });

  describe("addition of a new note", () => {
    test("succeeds with valid data", async () => {
      const newNote = {
        content: "async/await simplifies making async calls",
        important: true,
        user: userId,
      };

      await api
        .post("/api/notes")
        .send(newNote)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const notesAtEnd = await helper.notesInDb();
      assert.strictEqual(notesAtEnd.length, initialNotes.length + 1);

      const contents = notesAtEnd.map((n) => n.content);
      assert(contents.includes("async/await simplifies making async calls"));
    });

    test("fails with status code 400 if data invalid", async () => {
      const newNote = { important: true };

      await api.post("/api/notes").send(newNote).expect(400);

      const notesAtEnd = await helper.notesInDb();

      assert.strictEqual(notesAtEnd.length, initialNotes.length);
    });
  });

  describe("deletion of a note", () => {
    test("succeeds with status code 204 if id is valid", async () => {
      const notesAtStart = await helper.notesInDb();
      const noteToDelete = notesAtStart[0];

      await api.delete(`/api/notes/${noteToDelete.id}`).expect(204);

      const notesAtEnd = await helper.notesInDb();

      const contents = notesAtEnd.map((n) => n.content);
      assert(!contents.includes(noteToDelete.content));

      assert.strictEqual(notesAtEnd.length, initialNotes.length - 1);
    });
  });
});

// pass
// Users Test
describe("Users Test: when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash("sekret", 10);

    const user = new User({
      username: "root",
      passwordHash,
    });
    await user.save();
  });
  // pass
  test("creation succeeds with a fresh username", async () => {
    const usersBefore = await helper.usersInDB();
    const newUser = {
      username: "mobini",
      name: "mobin",
      password: "meoww",
    };
    const result = (await api.post("/api/users").send(newUser).expect(201))
      .body;

    const usersNow = await helper.usersInDB();
    assert.strictEqual(usersNow.length, usersBefore.length + 1);
    assert.strictEqual(newUser.username, result.username);
  });

  // Pass
  test("creation fails with proper statuscode and message if username already taken", async () => {
    const password = "hiddenpassword";
    const usersBefore = await helper.usersInDB();

    const newUser = {
      username: "root",
      name: "something else",
      password,
    };

    const response = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAfter = await helper.usersInDB();
    assert.strictEqual(usersAfter.length, usersBefore.length);
  });
});

after(async () => {
  await mongoose.connection.close();
});
