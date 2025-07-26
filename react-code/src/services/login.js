import axios from "axios";

const baseURL = `/api/login`;

const login = async (username, password) => {
  console.log("username, (password):", username, `(${password})`);
  const response = await axios.post(baseURL, { username, password });
  console.log("login result:", response.data);
};

export default {
  login,
};
