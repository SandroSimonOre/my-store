const express = require('express');
const router = express.Router();

const ordersController = require('../controllers/orders.controller')

router.get('/', ordersController.getAllOrders)

router.get('/:orderId', ordersController.getOneOrder)

router.post('/', ordersController.createOrder)

router.put('/:orderId', ordersController.updateOrder)

router.delete('/:orderId', ordersController.deleteOrder)

module.exports = router;