import React from "react";

const Note = ({ note, handleImportanceToggle }) => {
  const label = note.important ? "make 'not important'" : "make important";
  return (
    <li className="note">
      {`${note.content} | ${note.important} `}
      <button onClick={handleImportanceToggle(note.id)}> {label}</button>
    </li>
  );
};
export default Note;
