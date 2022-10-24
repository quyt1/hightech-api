const controller = require('./controller');
const express = require('express');
const { Auth } = require('../../middle/AuthMiddleware')
var router = express.Router();

router.get('/',Auth,controller.getOrders);
router.get('/me',Auth,controller.getMyOrders);
router.get('/:id',Auth, controller.getOneOrder);
router.post('/',Auth, controller.createOrder);
router.put('/:id',Auth, controller.updateOrder);

module.exports = router