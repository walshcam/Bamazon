import { connect } from "net";

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

connect.connect(function(err) {
    if (err) throw err;
    //Run the start function to begin program
    tableDisplay();
    start();
});

// Function that asks the user the id of the product they would like to buy and how much

function start() {
    // inquirer
    //     .prompt({
    //         name: "idSelection",
    //         type: "input",
    //         m
    //     })
}

// Function that Creates Table

function tableDisplay() {
    connection.query(
        "SELECT * FROM products", function(err,res) {
            if (err) throw err;
            //Use cli-table
            let table = new Table ({
                //Create Headers
                
            })

        }
    )
    
    let table = new Table ({
        head:
    })
}

// 6. The app should then prompt users with two messages.

//    * The first should ask them the ID of the product they would like to buy.
//    * The second message should ask how many units of the product they would like to buy.