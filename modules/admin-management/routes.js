const controller = require('./controller');
const express = require('express');
var router = express.Router();
const { Auth ,isSuperAdmin} = require('../../middle/AuthMiddleware')

router.get('/',isSuperAdmin,controller.getAllAdmin);
router.post('/',isSuperAdmin,controller.createAdmin);
router.get('/:id',isSuperAdmin,controller.getOneAdmin);
router.put('/:id',isSuperAdmin,controller.updateAdmin);
router.delete('/:id',isSuperAdmin,controller.deleteOneAdmin);




module.exports = router