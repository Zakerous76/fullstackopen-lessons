import React from "react";
import Note from "./Note";

const Part2_A_App = (props) => {
  const { notes } = props;

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((x) => (
          <Note key={x.id} text={x.content} />
        ))}
      </ul>
    </div>
  );
};

const Part2_A = () => {
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
  return <Part2_A_App notes={notes} />;
};

export default Part2_A;
