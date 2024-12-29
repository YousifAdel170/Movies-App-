/****************************************************************************************** */
/*                                Import                                                   */
/****************************************************************************************** */

import MoviesList from "./components/MoviesList";
import NavBar from "./components/NavBar";
import MovieDetails from "./components/MovieDetails";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import useLanguageDirection from "./Logic/useLanguageDirection";

function App() {
  useLanguageDirection();
  return (
    <div className="font color-body">
      <NavBar />
      <Container>
        <Routes>
          <Route path="/" element={<MoviesList />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
