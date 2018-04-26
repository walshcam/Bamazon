USE bamazon;

CREATE TABLE bamazon (
-- item_id
item_id INT NOT NULL AUTO_INCREMENT,
-- product_name
product_name VARCHAR(50) NOT NULL,
-- department_name
department_name VARCHAR(50) NOT NULL,
-- price (cost to customer)
price INT NOT NULL,
-- stock_quantity
stock_quantity INT NOT NULL,
-- Primary Key
PRIMARY KEY (item_id)
)