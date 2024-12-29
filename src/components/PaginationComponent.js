import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getPageMovieAction } from "../redux/actions/movieActions";

const PaginationComponent = () => {
  /*
    Steps to get the current page number:
      - read the number of the page from the URL by
        -- reading  the query parameters from the URL
        -- extract it to get the Page number
  */
  // useLocation: use Location Hook to read the number of the page from the URL (access the current URL)
  const location = useLocation();

  const dataLanguage = useSelector((state) => state.language);
  const dataDarkMode = useSelector((state) => state.darkMode);

  // URLSearchParams(location.search): to read the query parameters from the URL & extract it to get the Page number
  const searchParams = new URLSearchParams(location.search);
  // console.log(searchParams);
  const page = parseInt(searchParams.get("page") || "1");

  const navigate = useNavigate();

  // create a state to store the total number of pages in the API
  const [pageCount, setPageCount] = useState(0);

  const dispatchMovie = useDispatch();

  const numberOfPages = useSelector((state) => state.pageCount);

  useEffect(() => {
    setPageCount(numberOfPages);
  }, [numberOfPages]);

  // Fetch the correct page data when `page` changes
  useEffect(() => {
    // Dispatch the action to fetch the movies for the specified page
    dispatchMovie(getPageMovieAction(dataLanguage, page));
  }, [page, dispatchMovie, dataLanguage]);

  // handle the page click, also update the URL & fetch the data
  const handlePageClick = (data) => {
    dispatchMovie(getPageMovieAction(dataLanguage, data.selected + 1));

    // Update the URL with the selected page
    navigate(`?page=${data.selected + 1}`);
  };

  return (
    // Only render pagination if pageCount > 0
    pageCount > 0 && (
      <ReactPaginate
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName={`page-link ${
          dataDarkMode ? "dark-mode-pagination" : "ligh-mode"
        } `}
        nextLabel={dataLanguage === "ar" ? "التالي" : "Next"}
        nextClassName="page-item"
        nextLinkClassName={`page-link ${
          dataDarkMode ? "dark-mode-pagination" : "ligh-mode"
        } `}
        onPageChange={handlePageClick}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel={dataLanguage === "ar" ? "السابق" : "Prev"}
        previousClassName="page-item"
        previousLinkClassName={`page-link ${
          dataDarkMode ? "dark-mode-pagination" : "ligh-mode"
        } `}
        renderOnZeroPageCount={null}
        containerClassName="pagination justify-content-center p-3"
        pageClassName="page-item"
        pageLinkClassName={`page-link ${
          dataDarkMode ? "dark-mode-pagination" : "ligh-mode"
        } `}
        activeClassName="active"
        forcePage={page - 1} // Explicitly set the active page
      />
    )
  );
};

export default PaginationComponent;
