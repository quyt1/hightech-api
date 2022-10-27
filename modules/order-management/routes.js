const controller = require('./controller');
const express = require('express');
const { Auth } = require('../../middle/AuthMiddleware')
var router = express.Router();

router.use(Auth)
router.get('/',controller.getOrders);
router.post('/', controller.createOrder);
router.get('/:id', controller.getOneOrder);
router.put('/:id', controller.updateOrder);
router.get('/me',controller.getMyOrders);

module.exports = router