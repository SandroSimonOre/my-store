const express = require('express');
const path = require('path');
const swaggerUI = require('swagger-ui-express');
const authRouter = require('./routes/auth.route');
const usersRouter = require('./routes/users.route');
const customersRouter = require('./routes/customers.route');
const productsRouter = require('./routes/products.route');
const ordersRouter = require('./routes/orders.route');

//const validateAccessToken = require('./middlewares/validateAccessToken');


const swaggerDoc = require('./swagger.json')
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc, {customCss: '.swagger-ui .topbar { display: none }'}));
app.use('/api/auth', authRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/customers', customersRouter);
app.use('/api/v1/products', productsRouter);
app.use('/api/v1/orders', ordersRouter);
//app.use('/', (req, res) => res.sendFile(path.resolve(__dirname,  'index.html')));

module.exports = app;