import axios from "axios";
import { API, movieTypes } from "../types/movieTypes";

// function to get all the data (movies) from the API using axios
export const getAllMoviesAction = (language) => {
  return async (dispatch) => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API}&language=${language}&page=1`
    );
    dispatch({
      type: movieTypes.all,
      data: res.data.results,
      pages: res.data.total_pages,
    });
  };
};

// function responsible to handle the search for specific movie (will search while user entering data)
export const searchMovieAction = (searchedMovie, language) => {
  return async (dispatch) => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${API}&query=${searchedMovie}&language=${language}`
    );
    dispatch({
      type: movieTypes.all,
      data: res.data.results,
      pages: res.data.total_pages,
    });
  };
};

// function to get all the data (movies) from the API from specific page using axios
export const getPageMovieAction = (language, page) => {
  return async (dispatch) => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API}&language=${language}&page=${page}`
    );
    dispatch({
      type: movieTypes.all,
      data: res.data.results,
      pages: res.data.total_pages,
    });
  };
};

// function responsible to toggle the mode (dark/light)
export const toggleDarkModeAction = () => {
  return { type: movieTypes.toggleDarkMode };
};

// function responsible to toggle the language (arabic/english)
export const toggleLanguageAction = () => {
  return {
    type: movieTypes.toggleLanguage,
  };
};
