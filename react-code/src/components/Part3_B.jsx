import { useState, useEffect } from "react";
import Note from "./Note";
import noteService from "../services/notes";
import Notification from "./Notification";
import Footer from "./Footer";

const App = () => {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    noteService.getAll().then((initialNotes) => setNotes(initialNotes));
  }, []);

  const [newNote, setNewNote] = useState("a new note ...");
  const [showAllToggle, setshowAllToggle] = useState(false);
  const [showAllToggleText, setshowAllToggleText] = useState("Show All");
  const [importanceToggle, setImportanceToggle] = useState(false);

  const [errorMsg, setErrorMsg] = useState(null);

  const handleMakeImportant = (noteId) => () => {
    const targetNote = notes.find((note) => note.id === noteId);
    const updatedNote = { ...targetNote, important: !targetNote.important };

    noteService
      .update(updatedNote.id, updatedNote)
      .then((returnedNote) => {
        setNotes(
          notes.map((note) => (note.id === noteId ? returnedNote : note))
        );
      })
      .catch((err) => {
        setErrorMsg(
          `Fail: The note "${updatedNote.content}" is not found in the database. \n${err}`
        );
        setTimeout(() => {
          setErrorMsg(null);
        }, 5000);
        setNotes(
          notes.filter((note) => {
            return note.id !== noteId;
          })
        );
      });
  };

  const handleImportanceToggle = () => {
    setImportanceToggle((prev) => !prev);
  };

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: importanceToggle,
    };

    noteService.create(noteObject).then((res) => {
      noteService.getAll().then((updatedNotes) => setNotes(updatedNotes)); // if something is deleted on the backend, it should be reflected
      setNewNote("a new note ...");
      setImportanceToggle(false);
    });
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const handleNoteReset = (event) => {
    if (newNote === "a new note ...") {
      setNewNote("");
    }
  };

  const handleShowAllToggle = () => {
    const newState = !showAllToggle;
    setshowAllToggle(newState);
    if (newState) {
      setshowAllToggleText("Show Important");
    } else {
      setshowAllToggleText("Show All");
    }
  };

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMsg} />
      <ul>
        {notes.map((note) => {
          return (
            <Note
              key={note.id}
              note={note}
              handleImportanceToggle={handleMakeImportant}
            />
          );
        })}
      </ul>
      <form onSubmit={addNote}>
        <input
          type="text"
          value={newNote}
          onChange={handleNoteChange}
          onClick={handleNoteReset}
        />{" "}
        <button type="submit">save</button>
      </form>
      <button onClick={handleImportanceToggle}>
        Important ({importanceToggle ? "Yes" : "No"})
      </button>{" "}
      <br />
      <button onClick={handleShowAllToggle}>{showAllToggleText}</button>
      <Footer />
    </div>
  );
};

const Part2_E = () => {
  return <App />;
};

export default Part2_E;
