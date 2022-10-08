const express = require('express');
const router = express.Router();

const positionsController = require('../controllers/positions.controller')

router.get('/', positionsController.getAllPositions)

router.get('/:positionId', positionsController.getOnePosition)

router.post('/', positionsController.createPosition)

router.put('/:positionId', positionsController.updatePosition)

router.delete('/:positionId', positionsController.deletePosition)

module.exports = router;