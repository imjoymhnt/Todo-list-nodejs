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
  useFindAndModify: false,
});

const itemsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const listSchema = {
  name: String,
  items: [itemsSchema],
};

const List = mongoose.model("List", listSchema);

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

app.get("/:customListName", (req, res) => {
  const customListName = req.params.customListName;

  List.findOne({ name: customListName }, (err, foundList) => {
    if (!err) {
      if (!foundList) {
        // Create a new List
        const list = new List({
          name: customListName,
          items: defaultItems,
        });

        list.save();
        res.redirect(customListName);
      } else {
        // Show the existing List
        res.render("list", {
          listTitle: foundList.name,
          items: foundList.items,
        });
      }
    }
  });
});

app.post("/", (req, res) => {
  const itemName = req.body.todo;
  const listName = req.body.list;
  const item = new Item({
    name: itemName,
  });
  if (listName === "Today") {
    item.save();
    res.redirect("/");
  } else {
    List.findOne({ name: listName }, (err, foundList) => {
      foundList.items.push(item);
      foundList.save();
      res.redirect("/" + listName);
    });
  }
});

app.post("/delete", (req, res) => {
  // try
  const checkedItemId = req.body.check;
  Item.findByIdAndRemove(checkedItemId, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Delete Success");
    }
    res.redirect("/");
  });
  // try
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.listen(3000, () => {
  console.log("Listening to the port 3000");
});
