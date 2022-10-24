const controller = require('./controller');
const express = require('express');
var router = express.Router();
const { Auth ,isSuperAdmin} = require('../../middle/AuthMiddleware')

router.post('/login',controller.login);
router.post('/register',controller.register);
router.get('/logout',controller.logout);
router.get('/me',controller.getProlile);
router.put('/change-password',Auth,controller.changePassword);

router.get('/admin',isSuperAdmin,controller.getAllAdmin);
router.get('/admin/:id',isSuperAdmin,controller.getOneAdmin);
router.post('/admin',isSuperAdmin,controller.createAdmin);
router.put('/admin/:id',isSuperAdmin,controller.updateAdmin);
router.delete('/admin/:id',isSuperAdmin,controller.deleteOneAdmin);




module.exports = router