const controller = require('./controller');
const express = require('express');
const { Auth } = require('../../middle/AuthMiddleware')
var router = express.Router();
const ErrorHandler = require('../../middle/error-handler');

router.use(Auth)
router.get('/', ErrorHandler(controller.getCart));
router.post('/', ErrorHandler(controller.addOneProductToCart));
router.put('/', ErrorHandler(controller.updateProductQuantity));
router.post('/add-products', ErrorHandler(controller.addProductsToCart));


module.exports = router