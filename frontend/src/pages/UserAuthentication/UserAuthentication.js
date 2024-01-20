import "./UserAuthentication.css";
import { useState } from "react";
import React from "react";
import cjh_logo from "../../assets/cjh_logo_black.svg";
import { Link } from "react-router-dom";

const UserAuthentication = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeForm, setActiveForm] = useState("login");

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
      const response = await fetch(
        "https://code-journey-hub.onrender.com/api/login",
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);

        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);

        props.setIsLoggedIn(true);
        alert(data.message);
      } else {
        const error = await response.json();
        console.log(error);
        alert(error.error);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const registerUser = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "https://code-journey-hub.onrender.com/api/register",
        {
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
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);

        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);

        props.setIsLoggedIn(true);
        alert(data.message);
      } else {
        const error = await response.json();
        console.log(error);
        alert(error.error);
      }
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
                placeholder="Create a Password"
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

        <Link to="/about-us" className="link-about-us">
          <p>About Us</p>
        </Link>
      </div>
    </React.Fragment>
  );
};

export default UserAuthentication;
