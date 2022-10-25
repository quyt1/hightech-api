const controller = require('./controller');
const express = require('express');
var router = express.Router();
const { Auth ,isSuperAdmin} = require('../../middle/AuthMiddleware')

router.post('/login',controller.login);
router.post('/register',controller.register);
router.get('/logout',controller.logout);
router.get('/me',Auth,controller.getProlile);
router.put('/change-password',Auth,controller.changePassword);




module.exports = router