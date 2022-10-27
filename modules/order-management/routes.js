const controller = require('./controller');
const express = require('express');
const { Auth } = require('../../middle/AuthMiddleware')
var router = express.Router();

router.get('/',Auth,controller.getOrders);
router.post('/',Auth, controller.createOrder);
router.get('/:id',Auth, controller.getOneOrder);
router.put('/:id',Auth, controller.updateOrder);
router.get('/me',Auth,controller.getMyOrders);

module.exports = router