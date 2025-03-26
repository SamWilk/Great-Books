import { useState } from "react";
import getURLConfig from "../../../config/urlConfig";

const useAuthorSearch = () => {
  const [loading, setLoading] = useState(false);
  const searchAuthor = async (bookTitle, limit, offset, refetch) => {
    setLoading(true);
    const urlObj = getURLConfig();
    const params = new URLSearchParams({
      bookTitle: bookTitle,
      limit: limit,
      offset: offset,
    });
    try {
      // Need to add Author End point
      //   const response = await fetch(
      //     `${urlObj.APIUrl}/findBookByTitle?${params}`
      //   );
      //   const body = await response.json();
      setLoading(false);
      //   if (!refetch) {
      //     return createBookArray(body);
      //   } else {
      //     return createOnlyArray(body);
      //   }
    } catch (error) {
      console.error(error);
    }
  };
  return { searchAuthor, loading };
};

const createBookArray = (responseBody) => {
  var bookArray = [];
  responseBody.books.forEach((book) => {
    if (book.author_name != undefined) {
      const authorName = book.author_name[0];
      bookArray.push({
        Title: book.title,
        Author: authorName,
        YearPublished: book.first_publish_year,
        CoverID: book.cover_i,
      });
    }
  });
  return { BookCount: responseBody.num_found, BookArray: bookArray };
};

const createOnlyArray = (responseBody) => {
  var bookArray = new Array();
  responseBody.books.forEach((book) => {
    const authorName =
      book.author_name[0] != undefined ? book.author_name[0] : undefined;
    bookArray.push({
      Title: book.title,
      Author: authorName,
      YearPublished: book.first_publish_year,
      CoverID: book.cover_i,
    });
  });
  return bookArray;
};

export default useAuthorSearch;
