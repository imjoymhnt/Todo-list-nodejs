const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

const items = [];
const workItems = [];

app.get("/", (req, res) => {
  const day = date.getDate();
  res.render("list", { listTitle: day, items: items });
});

app.post("/", (req, res) => {
  const item = req.body.todo;
  items.push(item);
  res.redirect("/");
});

app.get("/work", (req, res) => {
  res.render("list", { listTitle: "Work List", items: workItems });
});

app.post("/work", (req, res) => {
  const item = req.body.todo;
  workItems.push(item);
  res.redirect("/work");
});

app.listen(3000, () => {
  console.log("Listening to the port 3000");
});
