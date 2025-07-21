import axios from "axios";
const baseURL = `/api/notes`;

const getAll = () => {
  const req = axios.get(baseURL);
  return req.then((res) => res.data);
};

const create = (object) => {
  console.log("Create called: ", object);
  return axios.post(baseURL, object).then((res) => res.data);
};

const update = (id, newObject) => {
  return axios.put(`${baseURL}/${id}`, newObject).then((res) => res.data);
};

export default {
  getAll,
  create,
  update,
};
