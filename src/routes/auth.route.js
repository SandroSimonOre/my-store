const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const validateToken = require('./../middlewares/validateToken');

router.post('/login', authController.handleLogin);
router.put('/changePassword', validateToken, authController.handleChangePassword);

module.exports = router;