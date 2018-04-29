# BAMAZON

## WHAT IS IT?

This is a database app that allows the user to manipulate a MySQL database with three different node.js programs. The inquirer node package is used to allow the user to manipulate the data.

## THE NODE.JS PROGRAMS

### ***bamazonCustomer.js***

This program allows you to: 
 - see what is for sale
 - select what you want to buy

An items total purchases are saved in the database to be used later.

![bamazonCustomer GIF](./gifs/bamazonCustomer.gif)

### ***bamazonManager.js***

This allows a manager to:
 - view what is for sale
 - view what items are running low on supply (less than 10 in stock)
 - add more stock to a selected item
 - add a new product for sale. The departments that can be selected are based on what the Supervisor has created

 ![bamazonManager GIF](./gifs/bamazonManager.gif)

### ***bamazonSupervisor.js***

The supervisor has the option to:
 - see what departments are available and what their sales are
 - add a new department that the manager can then add products to

 ![bamazonSupervisor GIF](./gifs/bamazonSupervisor.gif)

## TECHNOLOGIES APPLIED

- MySQL database
- node.js
    NPM Packages
    - mysql
    - inquirer
    - cli-table