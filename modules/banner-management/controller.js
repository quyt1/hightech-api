const { success, error } = require('../../helper/response')
const { Banners } = require('../../models')
const Validate = require('../../helper/get-errors-messages-validate');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')


async function getAll(req, res) {
    let banner = await Banners.getAll(req.query);
    return success(req, res, banner);
}

async function getOne(req, res) {
    let banner = await Banners.getByID(req.params.id);
    if (!banner) {
        return error(req, res, "Không tìm thấy banner");
    }
    return success(req, res, banner);
}

async function create(req, res) {
    let rules = {
        image: ['required']
    }

    let validate = await Validate(req.body, rules);

    if (validate) {
        return error(req, res, validate);
    }

    if(req.file){
        let image = `http://localhost:3000/img/${file.filename}`
        body = {...body,image : image}
    }

    const result = await Banners.createData(req.body);
    return success(req, res, result);
}

async function update(req, res) {
    const result = await Banners.updateData(req.params.id, req.body);
    return success(req, res, result);
}

async function deleteOne(req, res) {
    const result = await Banners.deleteOne(req.params.id);
    return success(req, res, result);
}

module.exports = {
    getAll,
    getOne,
    create,
    update,
    deleteOne
}