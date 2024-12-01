const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", require("./routes"));

// Server
app.listen(PORT, () => {
  console.log(`StyleSync is running at http://localhost:${PORT}`);
});
