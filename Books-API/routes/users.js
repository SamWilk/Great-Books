const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { v4 } = require("uuid");
require("dotenv").config();

const router = express.Router();

router.get("/api/getUser", async (req, res) => {
  const userName = req.query.UserName;
  res.send(`Found: ${userName}`);
});

module.exports = router;
