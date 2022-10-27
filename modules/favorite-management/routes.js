const controller = require('./controller');
const express = require('express');
var router = express.Router();
const { Auth } = require('../../middle/AuthMiddleware')

router.use(Auth);
router.get('/',controller.getAll);
router.post('/', controller.favorite);
router.get('/me',controller.getFavorites);
router.get('/check/:id', controller.checkFavorite);

module.exports = router