const controller = require('./controller');
const express = require('express');
var router = express.Router();
const upload = require('../../middle/upload')

router.get('/', controller.getAll);
router.post('/',[upload.array('files')],controller.create);
router.get('/:id', controller.getOne);
router.put('/:id', controller.update);
router.delete('/:id', controller.deleteOne);



module.exports = router