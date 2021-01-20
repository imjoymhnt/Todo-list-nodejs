const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost:27017/todolistDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const itemsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Item = mongoose.model("item", itemsSchema);

const item1 = new Item({
  name: "Code",
});
const item2 = new Item({
  name: "Eat",
});
const item3 = new Item({
  name: "Sleep",
});

Item.insertMany([item1, item2, item3], (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Success");
  }
});

app.get("/", (req, res) => {
  res.render("list", { listTitle: "Title", items: items });
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

app.get("/about", (req, res) => {
  res.render("about");
});

app.listen(3000, () => {
  console.log("Listening to the port 3000");
});
