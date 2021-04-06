import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import AlertTemplate from "react-alert-template-basic";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

// optional configuration
const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: "30px",
  // you can also just use 'scale'
  transition: transitions.SCALE
};

ReactDOM.render(
  <AlertProvider template={AlertTemplate} {...options}>
    <Router>
      <App />
    </Router>
  </AlertProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
