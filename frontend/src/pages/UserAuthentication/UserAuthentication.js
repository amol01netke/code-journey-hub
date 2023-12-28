import "./UserAuthentication.css";
import { useState } from "react";
import React from "react";
import cjh_logo from "../../assets/cjh_logo.png";

const UserAuthentication = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeForm, setActiveForm] = useState("login");

  const switchForm = (formType) => {
    setActiveForm(formType);
  };

  const loginUser = async () => {};

  const registerUser = async () => {
    const response = await fetch("http://localhost:8000/api/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await response.json();
    console.log(data);
  };

  return (
    <React.Fragment>
      <div className="user-authentication">
        <div className="form-header">
          <img src={cjh_logo} className="form-logo" alt="form-logo" />
        </div>

        <div className="forms">
          <div className={activeForm === "login" ? "form is-active" : "form"}>
            <h1>Login</h1>
            <form onSubmit={loginUser}>
              <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="form-input"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="form-input"
              />
              <input type="submit" value="Login" className="form-submit" />
            </form>
          </div>

          <div
            className={activeForm === "register" ? "form is-active" : "form"}
          >
            <h1>Register</h1>
            <form onSubmit={registerUser}>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className="form-input"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="form-input"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="form-input"
              />
              <input type="submit" value="Register" className="form-submit" />
            </form>
          </div>
        </div>

        <button
          className="form-switcher"
          onClick={() =>
            switchForm(activeForm === "login" ? "register" : "login")
          }
        >
          {activeForm === "login"
            ? `New User ? Register`
            : `Already regsitered ? Login`}
        </button>
      </div>
    </React.Fragment>
  );
};

export default UserAuthentication;
