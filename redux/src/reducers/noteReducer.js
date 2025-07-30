const noteReducer = (state = [], action) => {
  switch (action.type) {
    case "NEW_NOTE":
      return [...state, action.payload];
    case "TOGGLE_IMPORTANCE":
      return state.map((note) => {
        if (note.id === action.payload.id) {
          return { ...note, important: !note.important };
        }
        return note;
      });
    default:
      return state;
  }
};

export default noteReducer;
