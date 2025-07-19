import React from "react";
import { useState } from "react";
import Note from "./Note";

const App = (props) => {
  // initialize "notes" with "props.note" recieved from the caller
  const [notes, setNotes] = useState(props.notes);

  const [newNote, setNewNote] = useState("a new note ...");
  const [showAllToggle, setshowAllToggle] = useState(false);
  const [showAllToggleText, setshowAllToggleText] = useState("Show All");

  const notesToShow = showAllToggle
    ? notes
    : notes.filter((note) => note.important);

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: String(notes.length + 1),
    };
    setNotes(notes.concat(noteObject));
    setNewNote("a new note ...");
  };

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

  const handleNoteReset = (event) => {
    if (newNote === "a new note ...") {
      setNewNote("");
    }
  };

  const handleShowAllToggle = () => {
    console.log("clicked");
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
      <ul>
        {notesToShow.map((note) => {
          return (
            <Note
              key={note.id}
              text={note.content + " | important: " + note.important}
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
      <button onClick={handleShowAllToggle}>{showAllToggleText}</button>
    </div>
  );
};

const Part2_B = () => {
  const notes = [
    {
      id: 1,
      content: "HTML is easy",
      important: true,
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false,
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true,
    },
  ];
  return <App notes={notes} />;
};

export default Part2_B;
