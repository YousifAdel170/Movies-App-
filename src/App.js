/****************************************************************************************** */
/*                                Import                                                   */
/****************************************************************************************** */

import MoviesList from "./components/MoviesList";
import NavBar from "./components/NavBar";
import MovieDetails from "./components/MovieDetails";
import { Container } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

function App() {
  /****************************************************************************************** */
  /*                                States                                                   */
  /****************************************************************************************** */

  // create a state to store the movies to be rendered using (useState)
  const [movies, setMovies] = useState([]);

  // create a state to store the language of the page to be rendered using (useState)
  const [language, setLanguage] = useState("ar");

  // create a state to store the total number of pages in the API
  const [pageCount, setPageCount] = useState(0);

  // create a state to store the darkmode (check if it is activated or not)
  const [darkMode, setDarkMode] = useState(false);

  /****************************************************************************************** */
  /*                                Global Variables                                          */
  /****************************************************************************************** */
  // variable to store the  API key for themoviedb.org
  const api_key = "a579beaa78523fb5d1e557ccb383c5f9";

  // variable to store the beginning of the URL for each image
  const beginningImg = "https://image.tmdb.org/t/p/w500";

  /*
    Steps to get the current page number:
      - read the number of the page from the URL by
        -- reading  the query parameters from the URL
        -- extract it to get the Page number
  */
  // useLocation: use Location Hook to read the number of the page from the URL (access the current URL)
  const location = useLocation();
  // console.log(location);
  // console.log(location.search);

  // URLSearchParams(location.search): to read the query parameters from the URL & extract it to get the Page number
  const searchParams = new URLSearchParams(location.search);
  // console.log(searchParams);
  const page = parseInt(searchParams.get("page") || "1");

  /****************************************************************************************** */
  /*                                Functions                                                 */
  /****************************************************************************************** */

  // 1. get all the data (movies) from the API using axios
  const getAllMovies = async (url) => {
    try {
      const res = await axios.get(url);
      console.log(res.data); // Check the API response
      setMovies(res.data.results);
      setPageCount(res.data.total_pages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // 2. render all the movies that got from the API at once the page opened (using useEffect)
  useEffect(() => {
    // set the current page from the URL

    getAllMovies(
      `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=${language}&page=${page}`
    );
  }, [api_key, language, page]);

  // 3. function responsible to handle the search for specific movie (will search while user entering data)
  const search = async (searchedMovie) => {
    if (searchedMovie === "") {
      getAllMovies(
        `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=${language}&page=1`
      );
    } else {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${searchedMovie}&language=${language}`
      );
      setMovies(res.data.results);
      setPageCount(res.data.total_pages);
    }
  };

  // 4. function responsible to handle the pagination (moving to specific page)
  const getPage = async (page) => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=${language}&page=${page}`
    );
    setMovies(res.data.results);
    setPageCount(res.data.total_pages);
  };

  // function to toggle the language
  const toggleLanguage = () => {
    if (document.documentElement.lang === "ar") {
      document.documentElement.lang = "en";
      document.documentElement.dir = "ltr";
    } else {
      document.documentElement.lang = "ar";
      document.documentElement.dir = "rtl";
    }
    setLanguage((lang) => {
      const newLang = lang === "ar" ? "en-US" : "ar";

      return newLang;
    });
  };

  // Check local storage for dark mode preference
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "true") {
      setDarkMode(true);
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // every time the darkmode changes we need to save it in the localstorage
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    console.log(movies); // Check if movies data is fetched
  }, [movies]);

  /****************************************************************************************** */
  /*                                returned                                                  */
  /****************************************************************************************** */

  return (
    <div className="font color-body">
      <NavBar
        searchProp={search}
        toggleLanguageProp={toggleLanguage}
        darkModeProp={darkMode}
        toggleDarkModeProp={toggleDarkMode}
        languageProp={language}
      />
      <Container>
        <Routes>
          <Route
            path="/"
            element={
              <MoviesList
                beginningImgProp={beginningImg}
                moviesProp={movies}
                getPageProp={getPage}
                pageCountProp={pageCount}
                languageProp={language}
                darkModeProp={darkMode}
                pageProp={page} // Pass the page to MoviesList
              />
            }
          />

          <Route
            path="/movie/:id"
            element={
              <MovieDetails
                api_keyProp={api_key}
                beginningImgProp={beginningImg}
                languageProp={language}
                darkModeProp={darkMode}
              />
            }
          />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
