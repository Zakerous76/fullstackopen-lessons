import React, { useState } from "react";
import loginService from "../services/login";
import notesService from "../services/notes";

const LoginForm = ({ setErrorMsg, setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem("loggedNoteAppUser", JSON.stringify(user));
      notesService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log(error);
      setErrorMsg("Wrong Credentials");
      setTimeout(() => {
        setErrorMsg(null);
      }, 5000);
    }
  };
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

export default LoginForm;
