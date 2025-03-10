const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

//Routes
const users = require("./routes/users");
const books = require("./routes/books");

app.get("/api", (req, res) => {
  res.send("API is up and Running!");
});

app.use(users);
app.use(books);

const port = 4000;
app.listen(port, () => {
  console.log(`API running on port ${port}`);
});

module.exports = app;
