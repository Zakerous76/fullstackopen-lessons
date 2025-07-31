import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleImportanceOf } from "../reducers/noteReducer";

const Note = ({ note, handleClick }) => {
  return (
    <li key={note.id} onClick={() => handleClick(note.id)}>
      {note.content} <strong>{note.important ? "important" : ""}</strong>
    </li>
  );
};

const Notes = () => {
  const notes = useSelector(({ filter, notes }) => {
    if (filter === "ALL") {
      return notes;
    }
    return filter === "IMPORTANT"
      ? notes.filter((note) => note.important)
      : notes.filter((note) => !note.important);
  });
  const dispatch = useDispatch();
  const toggleImportance = (id) => {
    console.log("toggleImportance:", id);
    dispatch(toggleImportanceOf(id));
  };

  return (
    <div>
      <ul>
        {notes.map((note) => (
          <Note key={note.id} note={note} handleClick={toggleImportance} />
        ))}
      </ul>
    </div>
  );
};

export default Notes;
