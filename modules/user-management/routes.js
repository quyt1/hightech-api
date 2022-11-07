const controller = require('./controller');
const express = require('express');
var router = express.Router();
const ErrorHandler = require('../../middle/error-handler');
const { Auth, isSuperAdmin } = require('../../middle/AuthMiddleware')

router.post('/login', ErrorHandler(controller.login));
router.post('/register', ErrorHandler(controller.register));
router.post('/logout', ErrorHandler(controller.logout));
router.get('/me', Auth, ErrorHandler(controller.getProlile));
router.put('/me', Auth, ErrorHandler(controller.updateProfile));
router.put('/change-password', Auth, ErrorHandler(controller.changePassword));



module.exports = router