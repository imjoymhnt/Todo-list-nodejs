const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

const items = [];

app.get("/", (req, res) => {
  const day = date.getDate();
  res.render("list", { listTitle: day });
});

app.listen(3000, () => {
  console.log("Listening to the port 3000");
});
