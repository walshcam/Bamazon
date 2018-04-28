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
    //purchaseChoice();
});