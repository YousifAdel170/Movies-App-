import { Col, Container, Row } from "react-bootstrap";
import logo from "../imgs/logo.png";
import darkLogo from "../imgs/logo-dark.png";

const NavBar = ({
  searchProp,
  toggleLanguageProp,
  languageProp,
  darkModeProp,
  toggleDarkModeProp,
}) => {
  const searchFunction = (word) => {
    searchProp(word);
  };

  const toggleLanguageFunction = () => {
    toggleLanguageProp();
  };

  const toggleDarkModeFunction = () => {
    toggleDarkModeProp();
  };

  return (
    <div
      className={`nav-style w-100 ${darkModeProp ? "dark-mode" : "light-mode"}`}
    >
      <Container>
        <Row className="pt-2 " style={{ position: "relative" }}>
          <Col xs="2" lg="1">
            {" "}
            <a href="/moviesphere">
              <img
                className="logo"
                src={darkModeProp ? darkLogo : logo}
                alt="Logo"
              />
            </a>
          </Col>
          <Col className="d-flex align-items-center" xs="6" lg="9">
            <div className="search w-100">
              <i className="fa fa-search"></i>
              {languageProp === "ar" ? (
                <input
                  onChange={(e) => searchFunction(e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="ابحث"
                />
              ) : (
                <input
                  onChange={(e) => searchFunction(e.target.value)}
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
                darkModeProp ? "dark-mode" : "light-mode"
              } `}
            >
              {languageProp === "ar" ? "English" : "العربية"}
            </button>
          </Col>
          <Col xs="2" lg="1" className="d-flex justify-content-center">
            {" "}
            <button
              onClick={() => toggleDarkModeFunction()}
              className={`language-btn ${
                darkModeProp ? "dark-mode" : "light-mode"
              } `}
            >
              {darkModeProp ? (
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
