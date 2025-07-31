import ReactDOM from "react-dom/client";
import App from "./App";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import noteReducer, { createNote } from "./reducers/noteReducer";
import filterReducer from "./reducers/filterReducer";

const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer,
});

const store = createStore(reducer);
console.log("Initializing Store: ", store.getState());

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);

store.subscribe(() => {
  console.log(store.getState());
});
