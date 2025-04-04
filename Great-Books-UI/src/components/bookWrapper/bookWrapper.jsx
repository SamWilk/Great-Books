import { useNavigate } from "react-router-dom";

const BookWrapper = ({ children, book }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        localStorage.setItem("CoverID", book.CoverID);
        localStorage.setItem("BookID", book.BookID);
        localStorage.setItem("Title", book.Title);
        navigate(
          `/book?Title=${book.Title}&BookID=${book.BookID}&CoverID=${book.CoverID}`
        );
      }}
    >
      {children}
    </div>
  );
};

export default BookWrapper;
