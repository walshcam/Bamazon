// Import table function
let tableDisplay = require("./bamazonCustomer.js");

//Required npm packages

let mysql = require("mysql");
let inquirer = require("inquirer");
let Table = require("cli-table");

//Connection to sql database

let connection = mysql.createConnection({
    host: "localhost",
    port: 8889,

    //username
    user: "root",

    //password
    password: "root",
    database: "bamazon"
});

//Connect to the mysql server and sql database

connection.connect(function(err) {
    if (err) throw err;
    //Run the start function to begin program
    managerChoices();
});

function managerChoices() {
    inquirer
        .prompt ([
            {
                name: "managerChoice",
                type: "rawlist",
                message: "What would you like to do?",
                choices: [
                    "View Products For Sale",
                    "View Low Inventory",
                    "Add To Inventory",
                    "Add New Product"
                ]
            }
        ]).then(function(answer) {
            //switch statement for each response
            switch (answer) {
                case "View Products For Sale":
                    display();
                    break;
                case "View Low Inventory":
                    lowInventory();
                    break;
                case "Add To Inventory":
                    addInventory();
                    break;
                case "Add New Product":
                    newProduct();
                    break;
                default:
                    console.log("Switch Statment Error at managerChoices()");
                    break;
            }
        })
}

function display() {
    tableDisplay
}