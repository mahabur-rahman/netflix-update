import React, { useContext, useState } from "react";
import "./login.css";
import { login } from "../../context/authContext/apiCalls";
import { AuthContext } from "../../context/authContext/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isFetching, dispatch } = useContext(AuthContext);

  const handleClickLogin = (e) => {
    e.preventDefault();

    login({ email, password }, dispatch);
  };

  return (
    <div className="login">
      <form className="loginForm">
        <input
          type="email"
          placeholder="email"
          className="loginInput"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          className="loginInput"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="loginButton"
          onClick={handleClickLogin}
          disabled={isFetching}
        >
          Login
        </button>
      </form>
    </div>
  );
}
