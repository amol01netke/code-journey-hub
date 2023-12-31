import "./UserAuthentication.css";
import { useState } from "react";
import React from "react";
import cjh_logo from "../../assets/cjh_logo.png";
import { useHistory } from "react-router-dom";
import { Route } from "react-router-dom";
import UserDashboard from "../../pages/UserDashboard/UserDashboard";

const UserAuthentication = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeForm, setActiveForm] = useState("login");

  const history = useHistory();

  const switchForm = (formType) => {
    setActiveForm(formType);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };

  const loginUser = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      console.log(data);

      //store locally
      localStorage.setItem("token", data.token);

      <Route path="/user-dashboard" exact component={UserDashboard} />;
    } catch (error) {
      console.log(error.message);
    }
  };

  const registerUser = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });

      const data = await response.json();
      console.log(data);

      //store locally
      localStorage.setItem("token", data.token);

      <Route path="/user-dashboard" exact component={UserDashboard} />;
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <React.Fragment>
      <div className="user-authentication">
        <div className="form-header">
          <img src={cjh_logo} className="form-logo" alt="form-logo" />
        </div>

        {/*Login form*/}
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

          {/*Registration form*/}
          <div
            className={activeForm === "register" ? "form is-active" : "form"}
          >
            <h1>Register</h1>
            <form onSubmit={registerUser}>
              <div className="name">
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  className="form-input"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  className="form-input"
                />
              </div>
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
