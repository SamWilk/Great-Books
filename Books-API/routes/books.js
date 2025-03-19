const express = require("express");
const { getBookFromOpenLibraryByTitle } = require("../functions/bookFunctions");
require("dotenv").config();

const router = express.Router();

router.get("/api/getBooks:UserName", async (req, res) => {
  const userName = req.params.UserName.replace(":", "");
  console.log("UserName: ", userName);
  res.json({ UsersBook: userName });
});

router.get("/api/findBookByTitle:bookTitle", async (req, res) => {
  const bookTitle = req.params.bookTitle;
  if (!bookTitle) {
    res.status(404).json({ Message: "Title must be given" });
  }
  try {
    const bookList = await getBookFromOpenLibraryByTitle(
      bookTitle.replace(":", "")
    );
    const resObj = {
      num_found: bookList.num_found,
      books: bookList.docs,
    };
    return res.status(200).json(resObj);
  } catch (error) {
    console.log(error);
    res.status(500).json({ Error: "Issue getting Books" });
  }
});

module.exports = router;
