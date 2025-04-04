const express = require("express");
const { getBookFromOpenLibraryByTitle } = require("../functions/bookFunctions");
const verifyToken = require("../middleware/authMiddleWare");
require("dotenv").config();

const router = express.Router();

router.get("/api/getBooks:UserName", verifyToken, async (req, res) => {
  const userName = req.params.UserName.replace(":", "");
  console.log("UserName: ", userName);
  res.json({ UsersBook: userName });
});

router.get("/api/findBookByTitle", async (req, res) => {
  const searchParams = req.query;
  if (!searchParams) {
    res.status(404).json({ Message: "Title must be given" });
  }
  try {
    const bookList = await getBookFromOpenLibraryByTitle(searchParams);
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
