const controller = require('./controller');
const express = require('express');
const { Auth } = require('../../middle/AuthMiddleware')
var router = express.Router();

router.get('/',Auth,controller.getCart);
router.post('/',Auth, controller.addOneProductToCart);
router.post('/add-products',Auth, controller.addProductsToCart);
router.put('/',Auth, controller.updateProductQuantity);


module.exports = router