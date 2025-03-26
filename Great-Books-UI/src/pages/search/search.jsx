import { Formik, Form, Field, ErrorMessage } from "formik";
import CustomButton from "../../components/customButton/customButton";
import useBookSearch from "./searchBooks";
import { useState } from "react";
import * as Yup from "yup";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

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
  const [searchValue, setSearchValue] = useState("");

  const handleSubmit = async (values, { setSubmitting }) => {
    switch (values.searchSet) {
      case "Books":
        return findBooksAPI(values, setSubmitting, values.newSubmit);
      default:
        return null;
    }
  };

  const findBooksAPI = async (values, setSubmitting, newSubmit) => {
    setSubmitting(true);
    if (newSubmit) {
      setBooks(await searchBook(values.bookTitle, values.limit, 0));
      setSearchValue(values.bookTitle);
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

  // change this to be an infinite scroll component rather than paging it, makes it feel better
  const SearchItems = (props) => {
    return (
      <div>
        <div>Search for a {props.search}</div>
        <Formik
          initialValues={{
            bookTitle: "",
            page: page,
            limit: 20,
            offset: offset,
            searchSet: props.search,
          }}
          validationSchema={validationSchema}
          validateOnChange={false}
          validateOnBlur={false}
          enableReinitialize={true}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue }) => (
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
                  setFieldValue("newSubmit", true);
                }}
              >
                {isSubmitting ? "Searching" : `Find ${props.search}`}
              </CustomButton>

              <div>
                {loading ? (
                  <div>Loading...</div>
                ) : books.BookArray.length != 0 ? (
                  books.BookArray.map((e, idx) => {
                    return (
                      <div key={idx}>
                        {findDisplayItem(props.search, e, idx)}
                      </div>
                    );
                  })
                ) : (
                  <div>Nothing here</div>
                )}
              </div>

              {books.BookArray.length !== 0 ? (
                books.BookArray.length < books.BookCount ? (
                  <CustomButton
                    type="submit"
                    onClick={() => {
                      setPage(page + 1);
                      setFieldValue("bookTitle", searchValue);
                      setFieldValue("newSubmit", false);
                    }}
                  >
                    Next Page
                  </CustomButton>
                ) : null
              ) : null}
            </Form>
          )}
        </Formik>
      </div>
    );
  };

  const findDisplayItem = (searchType, item, idx) => {
    switch (searchType) {
      case "Books":
        return item.CoverID !== undefined ? (
          <>
            {item.Title}: {item.Author}
            <img
              key={idx}
              src={getCoverURL(item.CoverID)}
              alt="Book Cover"
              width={30}
              height={45}
            />
          </>
        ) : null;
      case "Author":
        return item.CoverID !== undefined ? (
          <>
            {item.Title}: {item.Author}
            <img
              key={idx}
              src={getCoverURL(item.CoverID)}
              alt="Book Cover"
              width={30}
              height={45}
            />
          </>
        ) : null;
      default:
        return null;
    }
  };

  return (
    <>
      <div>
        <Tabs>
          <TabList>
            <Tab>Books</Tab>
            <Tab>Authors</Tab>
            <Tab>Reviews</Tab>
          </TabList>

          <TabPanel>
            <SearchItems search="Books" />
          </TabPanel>
          <TabPanel>
            <h2>About Us</h2>
            <p>Learn more about our company and team.</p>
          </TabPanel>
          <TabPanel>
            <h2>Contact Us</h2>
            <p>Feel free to reach out via email or phone.</p>
          </TabPanel>
        </Tabs>
      </div>
    </>
  );
};

export default Search;
