import React, { useState } from "react";
import noteService from "../services/notes";

const NotesForm = ({ createNote, noteFormRef }) => {
  const [newNote, setNewNote] = useState("a new note ...");
  const [importanceToggle, setImportanceToggle] = useState(false);
  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };
  const handleNoteReset = () => {
    if (newNote === "a new note ...") {
      setNewNote("");
    }
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

    createNote(noteObject);
    noteFormRef.current.toggleVisibility();
    setNewNote("a new note ...");
    setImportanceToggle(false);
  };

  return (
    <div className="note-form">
      <form onSubmit={addNote}>
        <input
          type="text"
          placeholder="write note content here..."
          value={newNote}
          onChange={handleNoteChange}
          onClick={handleNoteReset}
        />{" "}
        <button type="submit">save</button>
      </form>
      <button onClick={handleImportanceToggle}>
        Important ({importanceToggle ? "Yes" : "No"})
      </button>
    </div>
  );
};

export default NotesForm;
