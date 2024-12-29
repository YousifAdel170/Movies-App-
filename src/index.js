import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { movieStore } from "./redux/store/movieStore";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={movieStore}>
    <BrowserRouter basename="/moviesphere">
      <App />
    </BrowserRouter>
  </Provider>
);
