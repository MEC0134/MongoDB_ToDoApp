// Require Modules 
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const mongo = require('mongodb');


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))
app.set('view engine', 'ejs');


// db connectionm
mongoose.connect("mongodb://127.0.0.1:27017/toDoListDB");

// db schema
const itemsSchema = new mongoose.Schema({
    name: String
});

// item model 
const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
    name: "Welcome to my to-do list!"
});
const item2 = new Item({
    name: "Hit the + button to add new item."
});
const item3 = new Item({
    name: "<-- Hit this to delete an item."
});

// add items to array 
const defaultItemsArr = [item1, item2, item3];




// Process Form and save item to db
app.post("/", (req, res) => {

    const itemName = req.body.newItem;

    const newItem = new Item({ name: itemName });

    newItem.save()
        .then(() => {
            console.log("Items Inserted");
        })

    res.redirect("/");
});



app.post('/delete', (req, res) => {

    // const itemChecked = req.body.itemChecked;
    const itemId = req.body.itemChecked;

    Item.findByIdAndRemove(itemId)
        .then(() => {
            console.log('item deleted');
        })

    res.redirect('/');
})



// home route
app.get("/", (req, res) => {

    // if no items exist in DB render insert and render default items 
    Item.find({})
        .then(itemsFound => {

            if (itemsFound.length === 0) {
                Item.insertMany(defaultItemsArr)
                    .then(() => {
                        console.log("Items Inserted")
                        res.redirect('/');
                    })
                    .catch(err => {
                        console.log(err);
                    })
                res.redirect('/');
            } else {
                res.render('todoList', { listTitle: "Today", toDoItems: itemsFound });
            }

        })
});











// Configure Server 
app.listen(3000, (req, res) => {

    console.log("Server running on 3000!");
})
