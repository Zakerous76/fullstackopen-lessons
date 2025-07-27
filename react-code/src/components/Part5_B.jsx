import { useState, useEffect, useRef } from "react";
import Note from "./Note";
import noteService from "../services/notes";
import Notification from "./Notification";
import Footer from "./Footer";
import LoginForm from "./LoginForm";
import NotesForm from "./NotesForm";
import Togglable from "./Togglable";

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
      // setShowLogin(false);
    } else {
      // setShowLogin(true);
    }
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
        <Togglable buttonLabel="login" ref={noteFormRef}>
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
            <Togglable buttonLabel="Create Note">
              <NotesForm setNotes={setNotes} noteFormRef={noteFormRef} />
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
