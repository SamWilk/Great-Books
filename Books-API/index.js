const express = require("express");
const cors = require("cors");
const app = express();

// Enable CORS for all routes
app.use(cors());

app.get("/api", (req, res) => {
  res.send("API is up and Running!");
});

const port = 4000;
app.listen(port, () => {
  console.log(`API running on port ${port}`);
});
