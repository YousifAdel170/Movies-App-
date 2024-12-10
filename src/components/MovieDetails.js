import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const MovieDetails = ({
  api_keyProp,
  beginningImgProp,
  languageProp,
  darkModeProp,
}) => {
  // Initialize with null to handle conditional rendering
  const [movieDetails, setMovieDetails] = useState(null);

  // State for error handling
  const [error, setError] = useState(null);

  // to get the id of the movie to display its details
  const params = useParams();

  // `https://api.themoviedb.org/3/movie/${params.id}?api_key=${api_keyProp}&language={language_code}`

  // render getMovieDetails function when the page rendered (once) so we will use useEffect Hook
  useEffect(() => {
    // [Fetch Movie Details using its ID] => get  the details of the movie from the API URL by its id (id getting from useParams)
    const getMovieDetails = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${params.id}?api_key=${api_keyProp}&language=${languageProp}`
        );
        setMovieDetails(res.data);
      } catch (err) {
        console.log("Error While Fetching the Details of the Movie", err);
        setError(
          languageProp === "ar"
            ? "تعذر تحميل تفاصيل الفيلم. يرجى المحاولة مرة أخرى."
            : "Unable to load movie details, Please try again."
        );
      }
    };

    getMovieDetails();
  }, [api_keyProp, params.id, languageProp]);

  // check if there is an error
  if (error) return <div className="text-center mt-4 text-danger">{error}</div>;

  // check if the movie details not there yet
  if (!movieDetails)
    return (
      <div className="text-center mt-4">
        {" "}
        {languageProp === "ar"
          ? "جارٍ تحميل التفاصيل..."
          : "Loading details..."}
      </div>
    );

  // console.log(movieDetails); // for testing
  return (
    <div>
      <Row className="justify-content-center">
        <Col md="12" xs="12" sm="12" className="mt-4 ">
          <div className="card-details d-flex aling-items-center">
            <img
              className="img-movie w-30"
              src={`${beginningImgProp}${movieDetails.poster_path}`}
              alt={`${movieDetails.title} Poster`}
            />
            <div className="justify-content-center text-center mx-auto">
              {languageProp === "ar" ? (
                <>
                  {" "}
                  <p className="card-text-details">
                    اسم الفيلم- <span>{movieDetails.title}</span>
                  </p>
                  <p className="card-text-details">
                    تاريخ الفيلم - <span>{movieDetails.release_date}</span>
                  </p>
                  <p className="card-text details">
                    عدد المقيمين - {movieDetails.vote_count}
                  </p>
                  <p className="card-text details">
                    التقييم - {movieDetails.vote_average}
                  </p>
                </>
              ) : (
                <>
                  {" "}
                  <p className="card-text-details">
                    Movie Name - <span>{movieDetails.title}</span>
                  </p>
                  <p className="card-text-details">
                    Release Date - <span>{movieDetails.release_date}</span>
                  </p>
                  <p className="card-text details">
                    Vote Count - {movieDetails.vote_count}
                  </p>
                  <p className="card-text details">
                    Vote Average - {movieDetails.vote_average}
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
              <p className="card-text-title">
                {languageProp === "ar" ? "القصة" : "Story"}
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
                darkModeProp ? "dark-mode dark-hover" : "light-mode"
              }`}
              style={{
                border: "none",
              }}
            >
              {languageProp === "ar" ? "عوده للرئيسية" : "Back To Main Page"}
            </button>
          </Link>
          <a href={movieDetails.homepage}>
            {" "}
            <button
              className={`btn btn-primary m-2 ${
                darkModeProp ? "dark-mode dark-hover" : "light-mode"
              }`}
              style={{ border: "none" }}
            >
              {languageProp === "ar" ? "مشاهدة الفيلم" : "Watch the Movie"}
            </button>
          </a>
        </Col>
      </Row>
    </div>
  );
};
export default MovieDetails;
