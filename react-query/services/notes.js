import axios from "axios";

const baseUrl = "http://localhost:3001/notes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const object = { content, important: false };
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const toggleImportanceOf = async (note) => {
  const newNote = {
    ...note,
    important: !note.important,
  };
  const result = await axios.put(`${baseUrl}/${newNote.id}`, newNote);
  return result.data;
};

export default {
  getAll,
  createNew,
  toggleImportanceOf,
};
