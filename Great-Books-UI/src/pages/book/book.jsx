import { useEffect } from "react";
import "./book.css";
import { useSearchParams, useNavigate } from "react-router-dom";

const Book = () => {
  const [searchParams] = useSearchParams();
  const naviagte = useNavigate();
  const Title = searchParams.get("Title");
  const BookID = searchParams.get("BookID");
  const CoverID = searchParams.get("CoverID");

  useEffect(() => {
    const checkCoverID = localStorage.getItem("CoverID");
    if (checkCoverID && checkCoverID != CoverID) naviagte("/search");

    const checkBookID = localStorage.getItem("BookID");
    if (checkBookID && checkBookID != BookID) naviagte("/search");

    const checkTitle = localStorage.getItem("Title");
    if (checkCoverID && checkTitle != Title) naviagte("/search");

    if (!Title || !BookID || !CoverID) {
      naviagte("/search");
    }
    // fetch Book Info from api and database
  }, []);

  const getCoverURL = (coverID) => {
    return `https://covers.openlibrary.org/b/id/${coverID}-L.jpg`;
  };

  const getBookInfo = () => {};

  const getBookReviews = () => {};

  return (
    <>
      Book here, {Title}
      <img
        src={getCoverURL(CoverID)}
        alt="Book Cover"
        width={275}
        height={400}
      />
    </>
  );
};

export default Book;
