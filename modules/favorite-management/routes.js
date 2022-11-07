const controller = require('./controller');
const express = require('express');
var router = express.Router();
const { Auth } = require('../../middle/AuthMiddleware')
const ErrorHandler = require('../../middle/error-handler');

router.use(Auth);
router.get('/', ErrorHandler(controller.getAll));
router.post('/', ErrorHandler(controller.favorite));
router.get('/me', ErrorHandler(controller.getMyFavorites));
router.get('/check/:id', ErrorHandler(controller.checkFavorite));

module.exports = router