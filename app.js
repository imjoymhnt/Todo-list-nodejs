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
  if (req.body.list === "Work List") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", (req, res) => {
  res.render("list", { listTitle: "Work List", items: workItems });
});

app.listen(3000, () => {
  console.log("Listening to the port 3000");
});
