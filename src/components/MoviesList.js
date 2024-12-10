import { Row } from "react-bootstrap";
import PaginationComponent from "./PaginationComponent";
import MovieCard from "./MovieCard";

const MoviesList = ({
  moviesProp,
  getPageProp,
  pageCountProp,
  beginningImgProp,
  languageProp,
  pageProp, // current page from the URL
  darkModeProp,
}) => {
  return (
    <Row className="mt-3">
      {moviesProp.length ? (
        moviesProp.map((movie) => (
          <MovieCard
            key={movie.id}
            movieProp={movie}
            beginningImgProp={beginningImgProp}
            languageProp={languageProp}
            darkModeProp={darkModeProp}
          />
        ))
      ) : (
        <h2 className="text-center p-5">
          {languageProp === "ar"
            ? "لا يوجد افلام الان"
            : "There are no movies now"}
        </h2>
      )}
      {moviesProp.length ? (
        <PaginationComponent
          getPageProp={getPageProp}
          pageCountProp={pageCountProp}
          languageProp={languageProp}
          pageProp={pageProp} // pass pageProp to PaginationComponent
          darkModeProp={darkModeProp}
        />
      ) : null}
    </Row>
  );
};

export default MoviesList;
