const express = require('express');
const router = express.Router();

const productsController = require('../controllers/products.controller')

router.get('/', productsController.getAllProducts)

router.get('/:productId', productsController.getOneProduct)

router.post('/', productsController.createProduct)

router.put('/:productId', productsController.updateProduct)

router.delete('/:productId', productsController.deleteProduct)

module.exports = router;