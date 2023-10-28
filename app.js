const express = require("express");
const axios = require("axios");
const ejs = require("ejs");

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.use(express.static("public"));
// app.use(express());

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/search", async (req, res) => {
  const searchTerm = req.query.name;
  const page = req.query.page || 1; // Default to page 1

  const perPage = 10; // Number of results per page

  const apiUrl = `https://api.github.com/search/users?q=${searchTerm}&sort=followers&order=desc&page=${page}&per_page=${perPage}`;

  console.log(apiUrl);

  try {
    const response = await axios.get(apiUrl);
    const data = response.data;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
