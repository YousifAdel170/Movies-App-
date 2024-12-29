import { Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { beginningImg } from "../redux/types/movieTypes";

const MovieCard = ({ movieProp }) => {
  const dataLanguage = useSelector((state) => state.language);
  const dataDarkMode = useSelector((state) => state.darkMode);
  return (
    <Col xs="6" sm="6" md="4" lg="3" className="my-1">
      <Link to={`/movie/${movieProp.id}`}>
        <div className="card">
          <img
            src={beginningImg + movieProp.poster_path}
            alt={movieProp.title + " Poster"}
            className="card-image"
          />
          <div
            className={`card-overlay ${
              dataDarkMode ? "dark-overlay" : "ligh-overlay"
            }`}
          >
            <div className="overlay-text text-center w-100 p-2">
              {dataLanguage === "ar" ? (
                <>
                  {" "}
                  <p>اسم الفيلم: {movieProp.title}</p>
                  <p> تاريخ الاصدار: {movieProp.release_date}</p>
                  <p> عدد المقيمين: {movieProp.vote_count}</p>
                  <p>التقييم : {movieProp.vote_average}</p>
                </>
              ) : (
                <>
                  <p> Movie Name: {movieProp.title}</p>
                  <p> Release Date: {movieProp.release_date}</p>
                  <p> Vote Count: {movieProp.vote_count}</p>
                  <p> Vote Average : {movieProp.vote_average}</p>
                </>
              )}
            </div>
          </div>
        </div>
      </Link>
    </Col>
  );
};

export default MovieCard;
