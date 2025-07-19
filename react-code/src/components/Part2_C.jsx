import React, { useEffect } from "react";
import { useState } from "react";
import Note from "./Note";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([]);

  console.log("Before Effect");
  useEffect(() => {
    console.log("Inside the effect");
    axios.get("http://localhost:3001/notes").then((res) => {
      console.log("Response recieved: ", res.data);
      setNotes(res.data);
    });
  }, []);
  console.log("render: ", notes.length, " notes");

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

const Part2_C = () => {
  return <App />;
};

export default Part2_C;
