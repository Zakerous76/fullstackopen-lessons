import { useState, useEffect, useRef } from "react";
import Note from "./Note";
import noteService from "../services/notes";
import Notification from "./Notification";
import Footer from "./Footer";
import LoginForm from "./LoginForm";
import NotesForm from "./NotesForm";
import Togglable from "./Togglable";
import loginService from "../services/login";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [showAllToggle, setshowAllToggle] = useState(false);
  const [showAllToggleText, setshowAllToggleText] = useState("Show All");
  const [user, setUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  // const [showLogin, setShowLogin] = useState(false);

  const noteFormRef = useRef();

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });

    const localUser = JSON.parse(
      window.localStorage.getItem("loggedNoteAppUser")
    );
    if (localUser) {
      setUser(localUser);
      noteService.setToken(localUser.token);
    } else {
    }
  }, []);

  const createNote = async (noteObject) => {
    await noteService.create(noteObject);
    noteFormRef.current.toggleVisibility();
    const updatedNotes = await noteService.getAll(); // if something is deleted on the backend, it should be reflected
    setNotes(updatedNotes);
  };

  const handleMakeImportant = async (noteId) => {
    const targetNote = notes.find((note) => note.id === noteId);
    const updatedNote = {
      ...targetNote,
      user: targetNote.user.id, // use `user.id` if it's an object; fallback to raw value
      important: !targetNote.important,
    };
    console.log("Updated Note:", updatedNote);

    try {
      const returnedNote = await noteService.update(
        updatedNote.id,
        updatedNote
      );
      setNotes(notes.map((note) => (note.id === noteId ? returnedNote : note)));
    } catch (error) {
      console.log("HandleMakeImportant: update error");
      setErrorMsg(
        `Fail: The note "${updatedNote.content}" is not found in the database. \n${error}`
      );
      setTimeout(() => {
        setErrorMsg(null);
      }, 5000);
      setNotes(
        notes.filter((note) => {
          return note.id !== noteId;
        })
      );
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

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedNoteAppUser");
  };

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMsg} />

      {user === null ? (
        <Togglable buttonLabel="login">
          <LoginForm setErrorMsg={setErrorMsg} setUser={setUser} />
        </Togglable>
      ) : (
        <div>
          <h2>Welcome!</h2>
          <p>
            <b>{user.name}</b> logged-in
          </p>
          <p>
            <button onClick={handleLogout}>Logout</button>
          </p>
          {
            <Togglable buttonLabel="Create Note" ref={noteFormRef}>
              <NotesForm createNote={createNote} noteFormRef={noteFormRef} />
            </Togglable>
          }
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
      <button onClick={handleShowAllToggle}>{showAllToggleText}</button>
      <Footer />
    </div>
  );
};

const Part5_B = () => {
  return <App />;
};

export default Part5_B;
