const express = require('express');
const path = require('path');
const swaggerUI = require('swagger-ui-express');
const authRouter = require('./routes/auth.route');
const usersRouter = require('./routes/users.route');
const customersRouter = require('./routes/customers.route');
const productsRouter = require('./routes/products.route');
const ordersRouter = require('./routes/orders.route');
const validateToken = require('./middlewares/validateToken');
const swaggerDoc = require('./swagger.json')
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc, {customCss: '.swagger-ui .topbar { display: none }'}));
app.use('/api/v1/login', authRouter);
app.use('/api/v1/users', validateToken, usersRouter);
app.use('/api/v1/customers', validateToken, customersRouter);
app.use('/api/v1/products', validateToken, productsRouter);
app.use('/api/v1/orders', validateToken, ordersRouter);

module.exports = app;