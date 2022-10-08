const express = require('express');
//const swaggerUI = require('swagger-ui-express');
const usersRouter = require('./routes/users.route');
const customersRouter = require('./routes/customers.route');
const productsRouter = require('./routes/products.route');
const ordersRouter = require('./routes/orders.route');
const positionsRouter = require('./routes/positions.route');
//const registerHandler = require('./handlers/register.handler');
//const loginHandler = require('./handlers/login.handler');
//const validateAccessToken = require('./middlewares/validateAccessToken');

//const swaggerDoc = require('./swagger.json')
const app = express();

app.use(express.json());
//app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc, {customCss: '.swagger-ui .topbar { display: none }'}));
//app.use('/api/register', registerHandler);
//app.use('/api/login', loginHandler);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/customers', customersRouter);
app.use('/api/v1/products', productsRouter);
app.use('/api/v1/orders', ordersRouter);
app.use('/api/v1/positions', positionsRouter);

module.exports = app;