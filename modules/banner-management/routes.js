const controller = require('./controller');
const express = require('express');
const upload = require('../../middle/upload')
var router = express.Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getOne);
router.post('/',[upload.single('file')],controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.deleteOne);



module.exports = router