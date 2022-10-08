-- POPULATING USERS TABLE

INSERT INTO users(user_id, role, password, email, first_name, last_name) 
VALUES ('22099136', 'admin', '123456', 'hello@sandrosimon.com', 'SANDRO', 'SIMON');

INSERT INTO users(user_id, role, password, email, first_name, last_name) 
VALUES ('22069334', 'seller', '123456', 'aurelia@correo.com', 'AURELIA', 'ORE');

INSERT INTO users(user_id, role, password, email, first_name, last_name) 
VALUES ('40245832', 'seller', '123456', 'yesica@gmail.com', 'YESICA', 'MARTINEZ');

-- POPULATING CUSTOMERS TABLE
INSERT INTO customers(customer_id, email, first_name, last_name) 
VALUES ('29688217', 'ariel@correo.com', 'ARIEL', 'HINOJOSA');

INSERT INTO customers(customer_id, email, first_name, last_name) 
VALUES ('43844573', 'jackie@correo.com', 'JACQUELINE', 'TEJADA');

INSERT INTO customers(customer_id, email, first_name, last_name) 
VALUES ('40483785', 'evelin@correo.com', 'EVELIN', 'ESCOBAR');

-- POPULATING PRODUCTS TABLE
INSERT INTO products(product_id, product_description, uom, stock, last_price, suggested_price) 
VALUES ('A100', 'LECHE', 'UND', 0, 0, 0);

INSERT INTO products(product_id, product_description, uom, stock, last_price, suggested_price) 
VALUES ('A200', 'PAPEL', 'UND', 0, 0, 0);

INSERT INTO products(product_id, product_description, uom, stock, last_price, suggested_price) 
VALUES ('A300', 'HARINA', 'UND', 0, 0, 0);

INSERT INTO products(product_id, product_description, uom, stock, last_price, suggested_price) 
VALUES ('A400', 'ARROZ', 'UND', 0, 0, 0);

-- POPULATING ORDERS TABLE
INSERT INTO orders( order_date, customer_id, salesperson_id) 
VALUES ('2022-10-01', '29688217', '40245832');

INSERT INTO orders( order_date, customer_id, salesperson_id) 
VALUES ('2022-10-02', '40483785', '22069334');

INSERT INTO orders( order_date, customer_id, salesperson_id) 
VALUES ('2022-10-04', '43844573', '22069334');

INSERT INTO orders( order_date, customer_id, salesperson_id) 
VALUES ('2022-10-05', '43844573', '22099136');

-- POPULATING POSITIONS TABLE
INSERT INTO positions( order_id, product_id, quantity, unit_price) 
VALUES (1, 'A100', 5, 4.5);

INSERT INTO positions( order_id, product_id, quantity, unit_price) 
VALUES (1, 'A300', 8, 5.6);

INSERT INTO positions( order_id, product_id, quantity, unit_price) 
VALUES (1, 'A400', 3, 9.8);

INSERT INTO positions( order_id, product_id, quantity, unit_price) 
VALUES (2, 'A200', 1, 4.5);

INSERT INTO positions( order_id, product_id, quantity, unit_price) 
VALUES (2, 'A300', 2, 5.6);

INSERT INTO positions( order_id, product_id, quantity, unit_price) 
VALUES (3, 'A300', 10, 5);

INSERT INTO positions( order_id, product_id, quantity, unit_price) 
VALUES (4, 'A100', 5, 8.3);

INSERT INTO positions( order_id, product_id, quantity, unit_price) 
VALUES (4, 'A300', 3, 10.3);