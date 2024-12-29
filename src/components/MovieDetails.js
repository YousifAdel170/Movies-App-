import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { API, beginningImg } from "../redux/types/movieTypes";
import { useSelector } from "react-redux";

const MovieDetails = () => {
  // Initialize with null to handle conditional rendering
  const [movieDetails, setMovieDetails] = useState(null);

  // State for error handling
  const [error, setError] = useState(null);

  // to get the id of the movie to display its details
  const params = useParams();

  const dataLanguage = useSelector((state) => state.language);
  const dataDarkMode = useSelector((state) => state.darkMode);

  // render getMovieDetails function when the page rendered (once) so we will use useEffect Hook
  useEffect(() => {
    // [Fetch Movie Details using its ID] => get  the details of the movie from the API URL by its id (id getting from useParams)
    const getMovieDetails = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${params.id}?api_key=${API}&language=${dataLanguage}`
        );
        setMovieDetails(res.data);
      } catch (err) {
        console.log("Error While Fetching the Details of the Movie", err);
        setError(
          dataLanguage === "ar"
            ? "تعذر تحميل تفاصيل الفيلم. يرجى المحاولة مرة أخرى."
            : "Unable to load movie details, Please try again."
        );
      }
    };

    getMovieDetails();
  }, [params.id, dataLanguage]);

  // check if there is an error
  if (error) return <div className="text-center mt-4 text-danger">{error}</div>;

  // check if the movie details not there yet
  if (!movieDetails)
    return (
      <div className="text-center mt-4">
        {" "}
        {dataLanguage === "ar"
          ? "جارٍ تحميل التفاصيل..."
          : "Loading details..."}
      </div>
    );

  // console.log(movieDetails); // for testing
  return (
    <div>
      <Row className="justify-content-center">
        <Col md="12" xs="12" sm="12" className="mt-4 ">
          <div className="card-details d-flex aling-items-center flex-wrap-mobile">
            <img
              className="img-movie w-30 margin-auto-mobile"
              src={`${beginningImg}${movieDetails.poster_path}`}
              alt={`${movieDetails.title} Poster`}
            />
            <div className="justify-content-center text-center mx-auto">
              {dataLanguage === "ar" ? (
                <>
                  {" "}
                  <p className="card-text-details card-text-details-mobile">
                    اسم الفيلم- <span>{movieDetails.title}</span>
                  </p>
                  <p className="card-text-details card-text-details-mobile">
                    تاريخ الفيلم - <span>{movieDetails.release_date}</span>
                  </p>
                  <p className="card-text-details card-text-details-mobile">
                    عدد المقيمين - <span>{movieDetails.vote_count}</span>
                  </p>
                  <p className="card-text-details card-text-details-mobile">
                    التقييم - <span>{movieDetails.vote_average}</span>
                  </p>
                </>
              ) : (
                <>
                  {" "}
                  <p className="card-text-details card-text-details-mobile">
                    Movie Name - <span>{movieDetails.title}</span>
                  </p>
                  <p className="card-text-details card-text-details-mobile">
                    Release Date - <span>{movieDetails.release_date}</span>
                  </p>
                  <p className="card-text-details card-text-details-mobile">
                    Vote Count - <span>{movieDetails.vote_count}</span>
                  </p>
                  <p className="card-text-details card-text-details-mobile">
                    Vote Average - <span>{movieDetails.vote_average}</span>
                  </p>
                </>
              )}
            </div>
          </div>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md="12" xs="12" sm="12" className="mt-4">
          {/* <div className="card-story d-flex flex-column align-items-start"> */}
          <div className="card-story d-flex flex-column align-items-start">
            {/* <div className="text-end p-4"> */}
            <div className=" p-4">
              <p className="card-text-title card-text-title-mobile">
                {dataLanguage === "ar" ? "القصة" : "Story"}
              </p>
              <p>{movieDetails.overview}</p>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="justify-content-center">
        {" "}
        <Col
          md="12"
          xs="12"
          sm="12"
          className="mt-2 d-flex justify-content-center"
        >
          <Link to={"/"}>
            {" "}
            <button
              className={`btn btn-primary m-2 ${
                dataDarkMode ? "dark-mode dark-hover" : "light-mode"
              }`}
              style={{
                border: "none",
              }}
            >
              {dataLanguage === "ar" ? "عوده للرئيسية" : "Back To Main Page"}
            </button>
          </Link>
          <a href={movieDetails.homepage}>
            {" "}
            <button
              className={`btn btn-primary m-2 ${
                dataDarkMode ? "dark-mode dark-hover" : "light-mode"
              }`}
              style={{ border: "none" }}
            >
              {dataLanguage === "ar" ? "مشاهدة الفيلم" : "Watch the Movie"}
            </button>
          </a>
        </Col>
      </Row>
    </div>
  );
};
export default MovieDetails;
