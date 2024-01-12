// src/index.js

import React from "react";
import ReactDOM from "react-dom";
import App from "./App"; // Import your main App component or the root component of your application
import reportWebVitals from "./reportWebVitals";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to measure performance in your app, you can uncomment the following lines
// Learn more about measuring performance: https://bit.ly/CRA-vitals
reportWebVitals();
