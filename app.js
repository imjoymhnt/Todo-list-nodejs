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

const defaultItems = [item1, item2, item3];

app.get("/", (req, res) => {
  Item.find((err, foundItems) => {
    if (err) {
      console.log(err);
    } else {
      if (foundItems.length === 0) {
        Item.insertMany(defaultItems, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Success");
          }
          res.redirect("/");
        });
      } else {
        res.render("list", { listTitle: "Today", items: foundItems });
      }
    }
  });
});

app.post("/", (req, res) => {
  const itemName = req.body.todo;
  const item = new Item({
    name: itemName,
  });
  item.save();
  res.redirect("/");
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
