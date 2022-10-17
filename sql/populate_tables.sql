-- POPULATING USERS TABLE
INSERT INTO users(id, role, password, email, first_name, last_name) 
VALUES
('ssimon', 'admin', '$2a$12$Sx0.q/7KUe0iYloH7NTJr.Ukcxe0.mIxmQjBkCbwzeLBSGg4jyREC', 'hello@sandrosimon.com', 'SANDRO', 'SIMON'),
('nbautista', 'seller', '$2a$12$Sx0.q/7KUe0iYloH7NTJr.Ukcxe0.mIxmQjBkCbwzeLBSGg4jyREC', 'nbautista@gmail.com', 'NOELIA', 'BAUTISTA'),
('mgalindo', 'seller', '$2a$12$Sx0.q/7KUe0iYloH7NTJr.Ukcxe0.mIxmQjBkCbwzeLBSGg4jyREC', 'mgalindo@gmail.com', 'MARYLIN', 'GALINDO'),
('jperez', 'guest', '$2a$12$Sx0.q/7KUe0iYloH7NTJr.Ukcxe0.mIxmQjBkCbwzeLBSGg4jyREC', 'jperez@gmail.com', 'JUAN', 'PEREZ');

-- POPULATING CUSTOMERS TABLE
INSERT INTO customers(id, email, first_name, last_name, salesperson_id) 
VALUES
('29688217', 'ariel@correo.com', 'ARIEL', 'HINOJOSA', 'ssimon'),
('43844573', 'jackie@correo.com', 'JACQUELINE', 'TEJADA', 'nbautista'),
('40483785', 'evelin@correo.com', 'EVELIN', 'ESCOBAR', 'mgalindo');

-- POPULATING PRODUCTS TABLE
INSERT INTO products(id, description, uom, stock, last_price, suggested_price) 
VALUES
('A100', 'LECHE', 'UND', 0, 0, 0),
('A200', 'PAPEL', 'UND', 0, 0, 0),
('A300', 'HARINA', 'UND', 0, 0, 0),
('A400', 'ARROZ', 'UND', 0, 0, 0);

-- POPULATING ORDERS TABLE
INSERT INTO orders( date, customer_id, salesperson_id)
VALUES 
('2022-10-01', '29688217', 'mgalindo'),
('2022-10-02', '40483785', 'ssimon'),
('2022-10-04', '43844573', 'ssimon'),
('2022-10-05', '43844573', 'nbautista');

-- POPULATING POSITIONS TABLE
INSERT INTO items( order_id, product_id, quantity, unit_price) 
VALUES
(1, 'A100', 5, 4.5),
(1, 'A300', 8, 5.6),
(1, 'A400', 3, 9.8),
(2, 'A200', 1, 4.5),
(2, 'A300', 2, 5.6),
(3, 'A300', 10, 5),
(4, 'A100', 5, 8.3),
(4, 'A300', 3, 10.3);