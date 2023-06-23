const mongoose = require('mongoose');



// db connectionm
mongoose.connect("mongodb://127.0.0.1:27017/toDoListDB");

// item schema
const itemsSchema = new mongoose.Schema({
    name: String
});


// list Schema
const listSchema = new mongoose.Schema({
    name: String,
    items: [itemsSchema]
});


// item model 
const Item = mongoose.model('Item', itemsSchema);

// list model 
const List = mongoose.model('List', listSchema);


module.exports = {
    Item: Item,
    List: List
};