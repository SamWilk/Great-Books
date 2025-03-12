const express = require("express");
require("dotenv").config();

const router = express.Router();

router.get("/api/getBooks:title", async (req, res) => {
  res.send("Still working on this atm")
});

module.exports = router;
