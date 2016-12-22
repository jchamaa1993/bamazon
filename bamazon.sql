#CREATE DATABASE Bamazon;

#use Bamazon;

CREATE TABLE products (
	item_id INTEGER(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    price INTEGER(11) NOT NULL,
    stock_quantity INTEGER(10)
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES(1, "shirt", "clothes", 15, 10);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES(2, "jeans", "clothes", 40, 10);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES(3, "sun glasses", "clothes", 60, 10);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES(4, "laptop", "technology", 1800, 10);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES(5, "ipad", "technology", 400, 10);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES(6, "banana", "groceries", 1, 10);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES(7, "milk", "groceries", 3, 10);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES(8, "candle", "miscellaneous", 12, 10);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES(9, "knife set", "appliances", 70, 10);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES(10, "toaster", "appliances", 30, 10);

