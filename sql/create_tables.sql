DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS customers;
DROP TABLE IF EXISTS users;


CREATE TABLE IF NOT EXISTS products
(
    id CHAR(4) NOT NULL PRIMARY KEY,
    description VARCHAR(100) NOT NULL,
    uom CHAR(3) NOT NULL, -- Unit of measurement
    -- stock NUMERIC(10,2) NOT NULL,
    stock NUMERIC(10, 2) DEFAULT 0.00,
    last_price NUMERIC(10, 2) DEFAULT 0.00,
    suggested_price NUMERIC(10, 2) DEFAULT 0.00
);

CREATE TABLE IF NOT EXISTS users
(
    id VARCHAR(10) PRIMARY KEY,
    role VARCHAR(20) NOT NULL CHECK ( role IN ('admin', 'seller', 'guest') ),
    password VARCHAR(100) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE CHECK (email::text ~ '(^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$)'),
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL
    -- Add a field pending_to_change_password
);

CREATE TABLE IF NOT EXISTS customers
(
    id VARCHAR(10) NOT NULL PRIMARY KEY,
    email VARCHAR(50) NOT NULL CHECK (email::text ~ '(^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$)'),
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    salesperson_id VARCHAR(10) NOT NULL REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS orders
(
    id SERIAL NOT NULL PRIMARY KEY,
    date DATE NOT NULL,
    customer_id VARCHAR(10) NOT NULL REFERENCES customers(id),
    salesperson_id VARCHAR(10) NOT NULL REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS items
(

    order_id INTEGER REFERENCES orders(id),
    product_id CHAR(4) REFERENCES products(id),
    quantity NUMERIC(10,2) NOT NULL,
    unit_price NUMERIC(10, 2) NOT NULL,
    PRIMARY KEY (order_id, product_id)
);




-- CREATE TABLE IF NOT EXISTS transactions (
--     transaction_id SERIAL NOT NULL PRIMARY KEY,
--     travel_id CHAR(10) NOT NULL REFERENCES travels(travel_id),
--     trans_date DATE NOT NULL,
--     doc_type CHAR(03) NOT NULL CHECK (doc_type::text ~ '([0-9]{3})'),
--     doc_number CHAR(9) NOT NULL,
--     account_code CHAR(8) NOT NULL REFERENCES accounts(account_code),
--     trans_description VARCHAR(100) NOT NULL,
--     amount NUMERIC(10,2) NOT NULL
-- );

-- CREATE TABLE IF NOT EXISTS accounts
-- (
--     account_code CHAR(8) NOT NULL PRIMARY KEY CHECK (account_code::text ~ '([0-9]{8})'),
--     account_name VARCHAR(100) NOT NULL
-- );

-- CREATE TABLE IF NOT EXISTS travels
-- (
--     travel_id CHAR(10) NOT NULL PRIMARY KEY,
--     user_id CHAR(10) NOT NULL REFERENCES users(user_id),
--     submit_date DATE NOT NULL,
--     currency CHAR(3) NOT NULL CHECK (currency IN('PEN', 'USD')),
--     total_amount NUMERIC(10,2) NOT NULL,
--     destination VARCHAR(50) NOT NULL
-- );