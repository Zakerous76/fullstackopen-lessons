import axios from "axios";
const baseURL = `/api/notes`;

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const req = axios.get(baseURL);
  return req.then((res) => res.data);
};

const create = async (object) => {
  const config = {
    headers: { authorization: token },
  };
  const response = await axios.post(baseURL, object, config);
  return response.data;
};

const update = (id, newObject) => {
  return axios.put(`${baseURL}/${id}`, newObject).then((res) => res.data);
};

export default {
  getAll,
  create,
  update,
  setToken,
};
