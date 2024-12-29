import { Row } from "react-bootstrap";
import PaginationComponent from "./PaginationComponent";
import MovieCard from "./MovieCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllMoviesAction } from "../redux/actions/movieActions";

const MoviesList = () => {
  // create a state to store the movies to be rendered using (useState)
  const [movies, setMovies] = useState([]);
  const dispatchMovie = useDispatch();

  const dataLanguage = useSelector((state) => state.language);

  // 2. render all the movies that got from the API at once the page opened (using useEffect)
  useEffect(() => {
    // set the current page from the URL
    dispatchMovie(getAllMoviesAction(dataLanguage));
  }, [dispatchMovie, dataLanguage]);

  const dataMovies = useSelector((state) => state.movies);

  useEffect(() => {
    setMovies(dataMovies);
  }, [dataMovies]);

  return (
    <Row className="mt-3">
      {movies.length ? (
        movies.map((movie) => <MovieCard key={movie.id} movieProp={movie} />)
      ) : (
        <h2 className="text-center p-5">
          {dataLanguage === "ar"
            ? "لا يوجد افلام الان"
            : "There are no movies now"}
        </h2>
      )}
      {movies.length ? <PaginationComponent /> : null}
    </Row>
  );
};

export default MoviesList;
