const controller = require('./controller');
const express = require('express');
var router = express.Router();
const ErrorHandler = require('../../middle/error-handler');
const { Auth, isSuperAdmin } = require('../../middle/AuthMiddleware')
const upload = require('../../middle/upload')

router.post('/login', ErrorHandler(controller.login));
router.post('/register', ErrorHandler(controller.register));
router.post('/logout', ErrorHandler(controller.logout));
router.get('/me', Auth, ErrorHandler(controller.getProlile));
router.put('/me', Auth,upload.single('avatar'),ErrorHandler(controller.updateProfile));
router.put('/change-password', Auth, ErrorHandler(controller.changePassword));
router.post('/forgot-password', ErrorHandler(controller.forgotPassword));
router.post('/verify-code', ErrorHandler(controller.verifyCode));
router.post('/reset-password', ErrorHandler(controller.resetPassword));



module.exports = router