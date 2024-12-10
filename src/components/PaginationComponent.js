import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";

const PaginationComponent = ({
  getPageProp,
  pageCountProp,
  languageProp,
  pageProp,
  darkModeProp,
}) => {
  const navigate = useNavigate();

  // handle the page click, also update the URL & fetch the data
  const handlePageClick = (data) => {
    const selectedPage = data.selected + 1;

    // Fetch the data for the selected page
    getPageProp(selectedPage);

    // Update the URL with the selected page
    navigate(`?page=${selectedPage}`);
  };
  return (
    <ReactPaginate
      breakLabel="..."
      breakClassName="page-item"
      breakLinkClassName={`page-link ${
        darkModeProp ? "dark-mode-pagination" : "ligh-mode"
      } `}
      nextLabel={languageProp === "ar" ? "التالي" : "Next"}
      nextClassName="page-item"
      nextLinkClassName={`page-link ${
        darkModeProp ? "dark-mode-pagination" : "ligh-mode"
      } `}
      onPageChange={handlePageClick}
      marginPagesDisplayed={2}
      pageRangeDisplayed={2}
      pageCount={pageCountProp}
      previousLabel={languageProp === "ar" ? "السابق" : "Previous"}
      previousClassName="page-item"
      previousLinkClassName={`page-link ${
        darkModeProp ? "dark-mode-pagination" : "ligh-mode"
      } `}
      renderOnZeroPageCount={null}
      containerClassName="pagination justify-content-center p-3"
      pageClassName="page-item"
      pageLinkClassName={`page-link ${
        darkModeProp ? "dark-mode-pagination" : "ligh-mode"
      } `}
      activeClassName="active"
      forcePage={pageProp - 1} // Explicitly set the active page
    />
  );
};

export default PaginationComponent;
