import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleImportanceOf } from "../reducers/noteReducer";
import noteServices from "../services/notes";

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
  const toggleImportance = async (note) => {
    await noteServices.toggleImportanceOf(note);
    dispatch(toggleImportanceOf(note.id));
  };

  return (
    <div>
      <ul>
        {notes.map((note) => (
          <Note
            key={note.id}
            note={note}
            handleClick={() => toggleImportance(note)}
          />
        ))}
      </ul>
    </div>
  );
};

export default Notes;
