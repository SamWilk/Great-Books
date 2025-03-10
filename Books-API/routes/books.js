const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { v4 } = require("uuid");
require("dotenv").config();

const router = express.Router();

router.get("/api/getBooks", (req, res) => {
  res.send("Found Books");
});

module.exports = router;
