const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { getUser, insertUser } = require("../functions/usersFunctions");
const { comparePassword } = require("../functions/auth/authFunctions");
const verifyToken = require("../middleware/authMiddleWare");
require("dotenv").config();

const router = express.Router();

router.post("/api/getUser", verifyToken, async (req, res) => {
  const user = await getUser(req.body.UserName);
  if (user) {
    res
      .json({ UserName: user.UserName, Email: user.Email, id: user._id })
      .status(200);
  } else {
    res.status(404).send("Cannot find user");
  }
});

router.get("/api/auth/checkMe", verifyToken, async (req, res) => {
  console.log("Checking Token");
  res.send("Happy Reading");
});

router.post("/api/createUser", async (req, res) => {
  try {
    const User = req.body;
    const user = await insertUser(User);
    if (user) {
      const token = jwt.sign(
        { id: user.id, UserName: user.UserName },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.status(200).json({
        accessToken: token,
        User: {
          UserName: user.UserName,
          Email: user.Email,
          id: user.id,
        },
      });
    } else {
      res
        .status(409)
        .json({ Error: "User was not created, UserName was not unique" });
    }
  } catch (error) {
    res.json({ Error: `Error Creating User: ${error}` }).status(500);
  }
});

router.delete("/api/deleteUser", async (req, res) => {
  res.status(200).send("Endpoint not set up atm");
});

router.post("/api/login", async (req, res) => {
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
          id: loginUser._id,
        },
      });
    } else {
      console.log("Invalid Password");
      res.status(401).json({ Error: "Invalid Password" });
    }
  } else {
    console.log(`Invalid Username: ${User.UserName}`);
    res.status(401).json({ Error: "Invalid UserName" });
  }
});

module.exports = router;
