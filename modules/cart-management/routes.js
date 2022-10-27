const controller = require('./controller');
const express = require('express');
const { Auth } = require('../../middle/AuthMiddleware')
var router = express.Router();

router.use(Auth)
router.get('/',controller.getCart);
router.post('/', controller.addOneProductToCart);
router.put('/', controller.updateProductQuantity);
router.post('/add-products', controller.addProductsToCart);


module.exports = router