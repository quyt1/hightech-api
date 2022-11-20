const controller = require('./controller');
const express = require('express');
var router = express.Router();
const ErrorHandler = require('../../middle/error-handler');
const { Auth, isSuperAdmin } = require('../../middle/AuthMiddleware')

router.get('/push/:deviceToken', ErrorHandler(controller.pushNotification));

module.exports = router