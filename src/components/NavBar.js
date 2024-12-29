import { Col, Container, Row } from "react-bootstrap";
import logo from "../imgs/logo.png";
import darkLogo from "../imgs/logo-dark.png";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllMoviesAction,
  searchMovieAction,
  toggleDarkModeAction,
  toggleLanguageAction,
} from "../redux/actions/movieActions";
import { useEffect, useState } from "react";

const NavBar = () => {
  const [language, setLanguage] = useState();
  const [darkMode, setdarkMode] = useState();

  const dispatchMovies = useDispatch();

  const getSearchedWord = (word) => {
    searchWithTheWord(word);
  };

  const searchWithTheWord = (word, page = 1) => {
    if (word === "") {
      dispatchMovies(getAllMoviesAction(language));
    } else {
      dispatchMovies(searchMovieAction(word, language, page));
    }
  };

  const toggleLanguageFunction = () => {
    dispatchMovies(toggleLanguageAction());
  };
  const dataLanguage = useSelector((state) => state.language);
  useEffect(() => {
    setLanguage(dataLanguage);
  }, [dataLanguage]);

  const toggleDarkModeFunction = () => {
    dispatchMovies(toggleDarkModeAction());
  };
  const dataDarkMode = useSelector((state) => state.darkMode);
  useEffect(() => {
    setdarkMode(dataDarkMode);
  }, [dataDarkMode]);

  return (
    <div className={`nav-style w-100 ${darkMode ? "dark-mode" : "light-mode"}`}>
      <Container>
        <Row className="pt-2 " style={{ position: "relative" }}>
          <Col xs="2" lg="1">
            {" "}
            <a href="/moviesphere">
              <img
                className="logo"
                src={darkMode ? darkLogo : logo}
                alt="Logo"
              />
            </a>
          </Col>
          <Col className="d-flex align-items-center" xs="6" lg="9">
            <div className="search w-100">
              <i className="fa fa-search"></i>
              {language === "ar" ? (
                <input
                  onChange={(e) => getSearchedWord(e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="ابحث"
                />
              ) : (
                <input
                  onChange={(e) => getSearchedWord(e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="Search"
                />
              )}
            </div>
          </Col>

          <Col xs="2" lg="1" className="d-flex justify-content-center">
            {" "}
            <button
              onClick={() => toggleLanguageFunction()}
              className={`language-btn ${
                darkMode ? "dark-mode" : "light-mode"
              } `}
            >
              {language === "ar" ? "English" : "العربية"}
            </button>
          </Col>
          <Col xs="2" lg="1" className="d-flex justify-content-center">
            {" "}
            <button
              onClick={() => toggleDarkModeFunction()}
              className={`language-btn ${
                darkMode ? "dark-mode" : "light-mode"
              } `}
            >
              {darkMode ? (
                <i className="fa-solid fa-moon"></i>
              ) : (
                <i className="fa-solid fa-sun"></i>
              )}
            </button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NavBar;
