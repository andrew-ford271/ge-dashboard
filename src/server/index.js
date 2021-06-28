const express = require("express");
const axios = require("axios");

const app = express();
const port = 8000;

let data;

const initData = async () => {
  try {
    const response = await axios.get("https://api.kanye.rest/");
    data = response.data.quote;
  } catch (error) {
    console.log(error);
    data = "";
  }
};

initData();

app.get("/hello", (req, res) => {
  console.log(req.url);
  res.send("Hello World!");
});
app.get("/api/init", (req, res) => {
  console.log(req.url);
  res.send(data);
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
