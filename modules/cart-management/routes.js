const controller = require('./controller');
const express = require('express');
const { Auth } = require('../../middle/AuthMiddleware')
var router = express.Router();

router.get('/',Auth,controller.getCart);
router.post('/',Auth, controller.addOneProductToCart);
router.put('/',Auth, controller.updateProductQuantity);
router.post('/add-products',Auth, controller.addProductsToCart);


module.exports = router