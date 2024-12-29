import { movieTypes } from "../types/movieTypes";

const InitialState = {
  movies: [],
  pageCount: 0,
  // Convert the value from localStorage to a boolean (this converts "true"/"false" string to a boolean)
  darkMode: localStorage.getItem("darkMode") === "true",
  language: localStorage.getItem("language") || "ar",
};

export const movieReducer = (state = InitialState, action) => {
  switch (action.type) {
    case movieTypes.all:
      return {
        ...state,
        movies: action.data,
        pageCount: action.pages,
      };
    case movieTypes.toggleDarkMode:
      const newDarkMode = !state.darkMode;
      localStorage.setItem("darkMode", newDarkMode); // Persist to localStorage
      return { ...state, darkMode: newDarkMode };
    case movieTypes.toggleLanguage:
      const newLanguage = state.language === "ar" ? "en-US" : "ar";
      localStorage.setItem("language", newLanguage); // Persist to localStorage
      return { ...state, language: newLanguage };
    default:
      return state;
  }
};
