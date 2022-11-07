const controller = require('./controller');
const express = require('express');
const { Auth } = require('../../middle/AuthMiddleware')
const ErrorHandler = require('../../middle/error-handler');
var router = express.Router();

router.use(Auth)
router.get('/', ErrorHandler(controller.getOrders));
router.post('/', ErrorHandler(controller.createOrder));
router.get('/me', ErrorHandler(controller.getMyOrders));
router.get('/:id', ErrorHandler(controller.getOneOrder));
router.put('/:id', ErrorHandler(controller.updateOrder));

module.exports = router