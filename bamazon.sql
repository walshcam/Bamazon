-- create database bamazon;

USE bamazon;
/*
DROP TABLE products;


CREATE TABLE products (
-- item_id
item_id INT NOT NULL AUTO_INCREMENT,
-- product_name
product_name VARCHAR(50) NOT NULL,
-- department_name
department_name VARCHAR(50) NOT NULL,
-- price (cost to customer)
price DECIMAL(12,2) NOT NULL,
-- stock_quantity
stock_quantity INT NOT NULL,
-- Primary Key
PRIMARY KEY (item_id)
);


INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ('ACDC Shirt','Clothing',14.99,50);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ('Cat Purse','Clothing',34.99,25);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ('Adult Dinosaur Onesie','Clothing',34.99,17);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ('Dragon Staple Remover','Office Supplies',9.99,28);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ('Super Glue','Office Supplies',7.99,38);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ('Dragon Staple Remover','Office Supplies',9.99,28);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ('Passport Carrier','Office Supplies',13.99,3);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ('Hello Kitty Ukelele','Music Supplies',52.99,158);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ('Limited Edition Guitar','Music Supplies',3459.95,28);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ('Guitar Pick','Music Supplies',0.99,28);
*/
/*
CREATE TABLE departments (
department_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
department_name VARCHAR(50) NOT NULL,
over_head_costs INT NOT NULL
);

INSERT INTO departments (department_name,over_head_costs)
VALUES ('Clothing',100000);

INSERT INTO departments (department_name,over_head_costs)
VALUES ('Office Supplies',350000);

INSERT INTO departments (department_name,over_head_costs)
VALUES ('Music Supplies',500000);
*/

ALTER TABLE products
ADD product_sales INT;

/*
ALTER TABLE products
DROP COLUMN total_profit;
*/