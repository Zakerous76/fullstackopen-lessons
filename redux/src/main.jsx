import React from "react";
import ReactDOM from "react-dom/client";

import { createStore } from "redux";
import noteReducer from "./reducers/noteReducer";

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    case "ZERO":
      return 0;
    default:
      return state;
  }
};

const counterStore = createStore(counterReducer);

const noteStore = createStore(noteReducer);

noteStore.dispatch({
  type: "NEW_NOTE",
  payload: {
    content: "new important note to the store",
    important: true,
    id: 1,
  },
});

noteStore.dispatch({
  type: "NEW_NOTE",
  payload: {
    content: "new unimportant note to the store",
    important: false,
    id: 2,
  },
});
console.log("noteStore:", noteStore.getState());
const App = () => {
  return (
    <div>
      <div>{counterStore.getState()}</div>
      <button onClick={(e) => counterStore.dispatch({ type: "INCREMENT" })}>
        plus
      </button>
      <button onClick={(e) => counterStore.dispatch({ type: "DECREMENT" })}>
        minus
      </button>
      <button onClick={(e) => counterStore.dispatch({ type: "ZERO" })}>
        zero
      </button>

      <div>
        {noteStore.getState().map((note) => {
          return note.important ? <li>{note.content}</li> : <></>;
        })}
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

const renderApp = () => {
  root.render(<App />);
};

renderApp(); // without this, the first render never appears
counterStore.subscribe(renderApp);
