const express = require("express");
const { getBookFromOpenLibraryByTitle } = require("../functions/bookFunctions");
require("dotenv").config();

const router = express.Router();

router.get("/api/getBooks:title", async (req, res) => {
  res.send("Still working on this atm");
});

router.get("/api/findBookByTitle:bookTitle", async (req, res) => {
  const bookTitle = req.params.bookTitle;
  if (!bookTitle) {
    res.status(404).json({ Message: "Title must be given" });
  }
  const bookList = await getBookFromOpenLibraryByTitle(
    bookTitle.replace(":", "")
  );
  console.log("List of books: ", bookList);
});

module.exports = router;
