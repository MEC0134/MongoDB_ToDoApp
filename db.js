const mongoose = require('mongoose');


mongoose.connect("mongodb://127.0.0.1:27017/toDoListDB");


const itemsSchema = new mongoose.Schema({
    name: String
});


const listSchema = new mongoose.Schema({
    name: String,
    items: [itemsSchema]
});


const Item = mongoose.model('Item', itemsSchema);


const List = mongoose.model('List', listSchema);


module.exports = {
    Item: Item,
    List: List
};