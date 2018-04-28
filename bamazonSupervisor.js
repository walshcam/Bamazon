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
    supervisorChoices();
});

//Initial Supervisor Choices

function supervisorChoices() {
    inquirer.prompt({
        name: "supervisorChoice",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View Product Sales by Department",
            "Create New Department",
            "Quit"
        ]
    }).then(function(answer) {
        console.log("\n");
        //switch statement for each response
        switch (answer.supervisorChoice) {
            case "View Product Sales by Department":
                supervisorTable();
                break;
            case "Create New Department":
                newDepartment();
                break;
            case "Quit":
                connection.end();
                break;
            default:
                console.log("Switch Statment Error at supervisorChoices()");
                break;
        }
    })
}

//Supervisor Table

function supervisorTable() {

}

//Add A New Department

function newDepartment() {
    
}