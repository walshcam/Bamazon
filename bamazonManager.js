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
                type: "list",
                message: "What would you like to do?",
                choices: [
                    "View Products For Sale",
                    "View Low Inventory",
                    "Add To Inventory",
                    "Add New Product",
                    "Quit"
                ]
            }
        ]).then(function(answer) {
            //console.log(answer.managerChoice);
            console.log("\n");
            //switch statement for each response
            switch (answer.managerChoice) {
                case "View Products For Sale":
                    tableDisplay();
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
                case "Quit":
                    connection.end();
                    break;
                default:
                    console.log("Switch Statment Error at managerChoices()");
                    break;
            }
        })
}

// Function that displays the current products

function tableDisplay() {
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
            console.log(table.toString() + "\n");
            managerChoices();
        }
    )
}

// Function That Displays The Low Inventory

function lowInventory() {
    connection.query(
        "SELECT * FROM products WHERE stock_quantity < 10", function(err,res) {
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
            console.log(table.toString() + "\n");
            managerChoices();
        }
    )
}

// Function that Allows You To Add More To The Current Inventory

function addInventory() {
    connection.query("SELECT * FROM products", function(err,res) {   
        inquirer
            .prompt([
                {
                name: "managerChoice",
                type: "list",
                message: "Which Product Will You Update?",
                choices: function() {
                    let choiceArray = [];
                    for (var i = 0; i < res.length; i++) {
                        choiceArray.push(res[i].product_name);
                    }
                    return choiceArray;
                }
                },
                {
                    name: "increase",
                    type: "input",
                    message: "How much would you like to increase the inventory?"
                }
            ]).then(function(answer) {
                //Get the information about the chosen item
                let chosenItem;
                for (let i = 0; i < res.length; i++) {
                  if (res[i].product_name === answer.managerChoice) {
                    chosenItem = res[i];
                  }
                }

                //Find New Quantity
                let newQuantity = parseInt(chosenItem.stock_quantity) + parseInt(answer.increase);

                //Increase The Quantity
                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: newQuantity
                        },
                        {
                            item_id: chosenItem.item_id
                        }
                    ]
                )
                console.log("There are now " + newQuantity + " " + chosenItem.product_name + "s.");
                managerChoices();
            })
    })        
}

// Function That Adds New Items To The Inventory

function newProduct() {
    connection.query(
        "SELECT department_name FROM products GROUP BY department_name", function(err,res) {   
        inquirer
            .prompt([
                {
                    name: "product_name",
                    type: "input",
                    message: "What item would you like to add?"
                },
                {
                    name: "department_name",
                    type: "list",
                    message: "Which department does this belong in?",
                    choices: function() {
                            let choiceArray = [];
                            for (var i = 0; i < res.length; i++) {
                                choiceArray.push(res[i].department_name);
                            }
                            return choiceArray; 
                    }
                },
                {
                    name: "price",
                    type: "input",
                    message: "How much does this new product cost? $"
                },
                {
                    name: "stock_quantity",
                    type: "input",
                    message: "How many items are there to sell?"
                }
            ]).then(function(answer){
                connection.query(
                    "INSERT INTO products SET ?",
                    {
                        product_name: answer.product_name,
                        department_name: answer.department_name,
                        price: answer.price,
                        stock_quantity: answer.stock_quantity
                    },
                    function(err) {
                        if (err) throw err;
                        console.log("A new product has been added!");
                        managerChoices();
                    }
                )
            })
        }    
    )        
}