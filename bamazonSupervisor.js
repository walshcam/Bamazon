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
    //Department ID and Department Name
    // query = "SELECT departments.department_id, departments.department_name";
    // query += " FROM departments";
    // query += " ORDER BY departments.department_id"

    //Sum of Product Sales
    // query = "SELECT(";
    // query += " SELECT department_id, department_name";
    // query += " FROM departments";
    // query += ") AS department,("
    query = "SELECT d.department_id, d.department_name, SUM(p.product_sales) AS department_sales";
    query += " FROM departments AS d LEFT JOIN products AS p ON p.department_name = d.department_name";
    query += " GROUP BY d.department_id, d.department_name";
    // query += " AS product";

    connection.query(query, function(err,res) {
            if (err) throw err;
            console.log(res);
            //Use cli-table
            // let table = new Table ({
            //     //Create Headers
            //     head: ['ID','DEPARTMENT','OVERHEAD','SALES','PROFIT / LOSS'],
            //     colWidths: [7, 25, 15, 15, 15]
            // });
            // for (let i = 0; i < res.length; i++) {
            //     table.push([res[i].item_id,res[i].product_name,res[i].department_name,"$ " + res[i].price,res[i].stock_quantity]);
            // }
            // console.log(table.toString() + "\n");
            supervisorChoices();
        }
    )
}

//Add A New Department

function newDepartment() {

}