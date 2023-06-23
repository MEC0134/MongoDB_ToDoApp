## To-Do List w/MongoDB

This application is a to-do list manager built using JavaScript, Node.js, and MongoDB. It allows users to create multiple to-do lists and add items to them. Users can also delete items from the lists.

## Prerequisites

Before running the application, make sure you have the following installed:

- Node.js
- MongoDB

## Installation

1. Clone the repository or download the source code.
2. Navigate to the project directory.
3. Install the dependencies by running the following command: npm install

## Configuration

The application uses a MongoDB database to store the to-do lists and items. By default, it connects to a local MongoDB server at `mongodb://127.0.0.1:27017/toDoListDB`. If you have MongoDB running on a different host or port, you can modify the database connection URL in the `db.js` file.

## Usage

To start the application, run the following command:

```bash
node app.js
```

Once the server is running, you can access the application by visiting `http://localhost:3000` in your web browser.

### Creating a new to-do list

To create a new to-do list, append the desired list name to the base URL. For example, to create a list named "Work", visit `http://localhost:3000/Work`. If the list doesn't exist, it will be created with some default items.

### Adding items to a list

To add a new item to a list, enter the item text in the input field at the top of the list and click the "+" button. The item will be added to the list and saved in the database.

### Deleting items from a list

To delete an item from a list, click the checkbox next to the item. The item will be removed from the list and deleted from the database.


## Acknowledgements

This application was built using the following technologies and libraries:

- JavaScript
- Node.js
- Express.js
- MongoDB
- Mongoose
- EJS
- lodash

## Contact

If you have any questions or suggestions, feel free to contact the developer at [m96celik@gmail.com](mailto:m96celik@gmail.com).


