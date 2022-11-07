const controller = require('./controller');
const express = require('express');
var router = express.Router();
const { Auth ,isSuperAdmin} = require('../../middle/AuthMiddleware')
const ErrorHandler = require('../../middle/error-handler');

router.use(isSuperAdmin)
router.get('/', ErrorHandler(controller.getAllAdmin));
router.post('/', ErrorHandler(controller.createAdmin))
router.get('/:id',ErrorHandler(controller.getOneAdmin))
router.put('/:id', ErrorHandler(controller.updateAdmin));
router.delete('/:id', ErrorHandler(controller.deleteOneAdmin));




module.exports = router