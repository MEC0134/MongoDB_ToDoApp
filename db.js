const mongoose = require('mongoose');
require('dotenv').config();

const password = process.env.DB_PASSWORD;

// db connectionm
mongoose.connect("mongodb+srv://m96celik:"+password+"@cluster0.2h20eno.mongodb.net/toDoListDB");

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