const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { getUser, insertUser } = require("../functions/usersFunctions");
const { comparePassword } = require("../functions/auth/authFunctions");
const verifyToken = require("../middleware/authMiddleWare");
require("dotenv").config();

const router = express.Router();

router.get("/api/getUser", verifyToken, async (req, res) => {
  const user = await getUser(req.body.UserName);
  if (user) {
    res.send(`Found: ${user.UserName}`).status(200);
  } else {
    res.status(404).send("Cannot find user");
  }
});

router.post("/api/createUser", async (req, res) => {
  try {
    const User = req.body;
    const wasInserted = await insertUser(User);
    if (wasInserted == true) {
      res.status(201).send(`User Created: ${User.UserName}`);
    } else {
      res.status(409).send("User was not created, UserName was not unique");
    }
  } catch (error) {
    res.send(`Error Creating User: ${error}`).status(500);
  }
});

router.delete("/api/deleteUser", async (req, res) => {
  res.status(200).send("Endpoint not set up atm");
});

router.get("/api/login", async (req, res) => {
  const User = req.body;

  const loginUser = await getUser(User.UserName);
  if (loginUser) {
    const matchedPasswords = await comparePassword(
      User.Password,
      loginUser.Password
    );

    if (matchedPasswords) {
      // Return true and generate JWT Token after
      console.log("Passwords match!");
      const token = jwt.sign(
        { id: loginUser._id, UserName: loginUser.UserName },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.status(200).json({
        accessToken: token,
        User: {
          UserName: loginUser.UserName,
          Email: loginUser.Email,
        },
      });
    } else {
      console.log("Invalid Password");
      res.status(401).send("Invalid Password");
    }
  } else {
    console.log(`Invalid Username: ${User.UserName}`);
    res.status(401).send("Invalid UserName");
  }
});

module.exports = router;
