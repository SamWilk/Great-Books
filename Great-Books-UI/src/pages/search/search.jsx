import { Formik, Form, Field, ErrorMessage } from "formik";
import CustomButton from "../../components/customButton/customButton";
import useBookSearch from "./searchBooks";
import { useState } from "react";
import * as Yup from "yup";

const validationSchema = Yup.object({
  bookTitle: Yup.string()
    .min(1, "Must Enter a Book")
    .required("Must Enter a Book"),
});

const Search = () => {
  const { searchBook, loading } = useBookSearch();
  const [page, setPage] = useState(1);
  const [books, setBooks] = useState({ BookCount: 0, BookArray: [] });
  const [offset, setOffset] = useState(0);
  const [newSubmit, setNewSubmit] = useState(true);

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    if (newSubmit) {
      console.log(values.bookTitle);
      setBooks(await searchBook(values.bookTitle, values.limit, 0));
      setNewSubmit(false);
    } else {
      setOffset(20 * page);
      const newBooks = await searchBook(
        values.bookTitle,
        values.limit,
        offset,
        true
      );

      setBooks((prevBooks) => ({
        ...prevBooks,
        BookArray: [...prevBooks.BookArray, ...newBooks], // Append newBooks to BookArray
      }));
    }

    setSubmitting(false);
  };

  const getCoverURL = (coverID) => {
    return `https://covers.openlibrary.org/b/id/${coverID}-S.jpg`;
  };

  return (
    <>
      <div>
        <div>Search for a book</div>
        <div>
          <Formik
            initialValues={{
              bookTitle: "",
              page: page,
              limit: 20,
              offset: offset,
            }}
            validationSchema={validationSchema}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="login-form">
                <div>
                  <ErrorMessage
                    name="bookTitle"
                    component="div"
                    className="customError"
                  />
                  <Field
                    type="text"
                    name="bookTitle"
                    placeholder="Enter a book"
                  />
                </div>

                <CustomButton
                  type="submit"
                  disabled={isSubmitting}
                  OnClick={() => {
                    setNewSubmit(true);
                  }}
                >
                  {isSubmitting ? "Searching" : "Find books"}
                </CustomButton>

                <div>
                  {loading ? (
                    <div>Loading...</div>
                  ) : books.BookArray.length != 0 ? (
                    books.BookArray.map((e, idx) => {
                      return (
                        <div key={idx}>
                          {e.CoverID != undefined ? (
                            <>
                              {e.Title}: {e.Author}
                              <img
                                key={idx}
                                src={getCoverURL(e.CoverID)}
                                alt="Book Cover"
                                width={30}
                                height={45}
                              />{" "}
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <div>Nothing here</div>
                  )}
                </div>

                {books.BookArray.length != 0 ? (
                  <CustomButton
                    type="submit"
                    OnClick={() => {
                      setPage(page + 1);
                    }}
                  >
                    Next Page
                  </CustomButton>
                ) : (
                  <></>
                )}
              </Form>
            )}
          </Formik>{" "}
        </div>
      </div>
    </>
  );
};

export default Search;
