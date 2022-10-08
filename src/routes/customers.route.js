const express = require('express');
const router = express.Router();

const customersController = require('../controllers/customers.controller')

router.get('/', customersController.getAllCustomers)

router.get('/:customerId', customersController.getOneCustomer)

router.post('/', customersController.createCustomer)

router.put('/:customerId', customersController.updateCustomer)

router.delete('/:customerId', customersController.deleteCustomer)

module.exports = router;