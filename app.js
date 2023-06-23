// Require Modules 
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');
const { Item, List } = require('./db.js');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))
app.set('view engine', 'ejs');


const item1 = new Item({
    name: "Welcome to my to-do list!"
});
const item2 = new Item({
    name: "Hit the + button to add new item."
});
const item3 = new Item({
    name: "<-- Hit this to delete an item."
});

const defaultItems = [item1, item2, item3];



app.get("/", (req, res) => {

    Item.find({})
        .then(itemsFound => {

            if (itemsFound.length === 0) {
                Item.insertMany(defaultItems)
                    .then(() => {
                        console.log("Items Inserted")
                        res.redirect('/');
                    })
                    .catch(err => {
                        console.log(err);
                    })
            } else {
                res.render('todoList', { listTitle: "Today", toDoItems: itemsFound });
            }

        })
});




app.post("/", (req, res) => {

    const itemName = req.body.newItem;
    const listName = req.body.list;

    const newItem = new Item({ name: itemName });

    // check if item was added from default list
    if (listName === "Today") {
        newItem.save()
        res.redirect("/")
    } else {
        List.findOne({ name: listName })
            .then((foundList) => {
                if (foundList) {
                    foundList.items.push(newItem);
                    foundList.save();
                    res.redirect('/' + listName);
                }
            })
    }
});



app.post('/delete', (req, res) => {

    const itemId = req.body.itemChecked;
    const listName = req.body.listName;

    console.log(itemId);

    if (listName === "Today") {
        Item.findByIdAndRemove(itemId)
            .then(() => {
                console.log('Item Removed');
            })
        res.redirect('/');
    } else {
        List.findOneAndUpdate({ name: listName }, { $pull: { items: { _id: itemId } } })
            .then(() => {
                console.log('Item Deleted');
            })
        res.redirect('/' + listName)
    }
})


app.get("/:customList", (req, res) => {

    const customList = _.capitalize(req.params.customList);

    List.findOne({ name: customList })
        .then((foundList) => {
            if (!foundList) {

                const list = new List({
                    name: customList,   
                    items: defaultItems
                });
                list.save()
                res.redirect('/' + customList);
            }
            else {
                res.render("todoList", { listTitle: customList, toDoItems: foundList.items })
            }
        })
});









app.listen(3000, (req, res) => {

    console.log("Server running on 3000!");
});
