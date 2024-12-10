import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
const basename = process.env.NODE_ENV === "development" ? "" : "/moviesphere";
root.render(
  <React.StrictMode>
    <BrowserRouter basename="">
      {" "}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
