import { useState, useEffect } from "react";
import Note from "./Note";
import noteService from "../services/notes";
import Notification from "./Notification";
import Footer from "./Footer";
import loginService from "../services/login";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("a new note ...");
  const [showAllToggle, setshowAllToggle] = useState(false);
  const [showAllToggleText, setshowAllToggleText] = useState("Show All");
  const [importanceToggle, setImportanceToggle] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

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

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in with: ", username, password);

    try {
      const user = await loginService(username, password);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      setErrorMsg("Wrong Credentials");
      setTimeout(() => {
        setErrorMsg(null);
      }, 5000);
    }
  };

  const loginForm = () => {
    return (
      <div className="login-section">
        <form action="post" onSubmit={handleLogin}>
          <div>
            <label htmlFor="username">Username </label>
            <input
              type="text"
              name="Username"
              id="username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password </label>
            <input
              type="text"
              name="Password"
              id="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  };

  const noteForm = () => {
    return (
      <div className="note-form">
        <form onSubmit={addNote}>
          <input
            type="text"
            value={newNote}
            onChange={handleNoteChange}
            onClick={handleNoteReset}
          />{" "}
          <button type="submit">save</button>
        </form>
      </div>
    );
  };

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMsg} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} logged-in</p>
          {noteForm()}
        </div>
      )}
      <div className="notes-section">
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
      </div>

      <div className="function-buttons">
        <button onClick={handleImportanceToggle}>
          Important ({importanceToggle ? "Yes" : "No"})
        </button>{" "}
        <br />
        <button onClick={handleShowAllToggle}>{showAllToggleText}</button>
      </div>

      <Footer />
    </div>
  );
};

const Part5_A = () => {
  return <App />;
};

export default Part5_A;
