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
    purchaseChoice();
});

// Function that asks the user the id of the product they would like to buy and how much

function purchaseChoice() {
    tableDisplay();
    connection.query("SELECT * FROM products", function(err, res) {
        let numberOfItems = res.length;
        inquirer
            .prompt([
            {
                name: "idSelection",
                type: "input",
                message: "Which product would you like to buy? (input ID number)",
                validate: function(value) {
                    if (isNaN(value) === false) {
                        if (value <= numberOfItems) {
                            return true;
                        }
                        return false;
                    }
                    return false;            
                }
            },
            {
                name: "quantity",
                type: "input",
                message: "How many would you like to buy?",
            }   
            ])
            .then(function(answer) {
                //change quantity amount in server
                let chosenItem = res[answer.idSelection-1];
                // console.log(answer.idSelection);
                // console.log(chosenItem);
                //Determine if there is enough in stock

                if (chosenItem.stock_quantity > parseInt(answer.quantity)) {
                    // if there is enough, the database will be updated
                    let quantityLeft = chosenItem.stock_quantity-parseInt(answer.quantity);
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: quantityLeft
                            },
                            {
                                item_id: chosenItem.item_id
                            }
                        ],
                        function (error) {
                            if (error) throw error;
                                if (answer.quantity > 1) {
                                    console.log("You have successfully purchased " + answer.quantity + " " + chosenItem.product_name + "s");
                                }
                                else {
                                    console.log("You have successfully purchased " + answer.quantity + " " + chosenItem.product_name);
                                }
                                startOver();
                        }
                    )
                }
                else {
                    //Run this if there is not enough in stock
                    console.log("There was not enough in stock at this time.");
                    startOver();
                }
            })
    })
}

// Function that allows you to exit the program

function startOver() {
    inquirer
        .prompt({
            name: "continue",
            type: "confirm",
            message: "Would you like to buy another product?",
            default: true
        })
        .then(function(answer) {
            if (answer.continue) {
                purchaseChoice();
            }
            else {
                connection.end();
            }
        })
}

// Function that Creates Table

function tableDisplay() {
    console.log("\n")
    connection.query(
        "SELECT * FROM products", function(err,res) {
            if (err) throw err;
            //Use cli-table
            let table = new Table ({
                //Create Headers
                head: ['ID','PRODUCT','DEPARTMENT','PRICE','STOCK'],
                colWidths: [7, 50, 25, 15, 10]
            });
            for (let i = 0; i < res.length; i++) {
                table.push([res[i].item_id,res[i].product_name,res[i].department_name,"$ " + res[i].price,res[i].stock_quantity]);
            }
            console.log(table.toString());
        }
    )
}