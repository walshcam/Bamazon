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
    tableDisplay();
    purchaseChoice();
});

// Function that asks the user the id of the product they would like to buy and how much

function purchaseChoice() {
    inquirer
        .prompt({
            name: "idSelection",
            type: "input",
            comment: "Which product would you like to buy? (input ID number)",
            validate: function(value) {
                if (isNaN(value) === false) {
                    connection.query(
                        "SELECT * FROM products", function(err,res) {
                            if (err) throw err;
                            let maximumNumber = res.length;
                            if (value < maximumNumber) {
                                return true;
                            }
                            return false;
                        }
                    )
                }
                return false;            
            }
        })
}

// Function that Creates Table

function tableDisplay() {
    connection.query(
        "SELECT * FROM products", function(err,res) {
            if (err) throw err;
            //Use cli-table
            console.log("We're At The Table Function")
            let table = new Table ({
                //Create Headers
                head: ['ID','PRODUCT','DEPARTMENT','PRICE','STOCK'],
                colWidths: [7, 50, 25, 15, 10]
            });
            console.log("We're at the heading " + [res[1].product_name,res[1].department_name]);
                for (let i = 0; i < res.length; i++) {
                   table.push([res[i].item_id,res[i].product_name,res[i].department_name,"$ " + res[i].price,res[i].stock_quantity]);
                }
            console.log(table.toString());
            connection.end();
        }
    )
}

// 6. The app should then prompt users with two messages.

//    * The first should ask them the ID of the product they would like to buy.
//    * The second message should ask how many units of the product they would like to buy.