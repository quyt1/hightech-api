const controller = require('./controller');
const express = require('express');
var router = express.Router();
const { Auth } = require('../../middle/AuthMiddleware')

router.use(Auth);
router.get('/',controller.getAll);
router.get('/me',controller.getFavorites);
router.get('/check/:id', controller.checkFavorite);
router.post('/', controller.favorite);

module.exports = router