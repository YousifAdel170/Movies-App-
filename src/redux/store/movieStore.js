import { applyMiddleware, createStore } from "redux";
import { movieReducer } from "../reducer/movieReducer";
import { thunk } from "redux-thunk";

export const movieStore = createStore(movieReducer, applyMiddleware(thunk));
