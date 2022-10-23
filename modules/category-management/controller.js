const { success, error } = require('../../helper/response')
const { Categories } = require('../../models')
const Validate = require('../../helper/get-errors-messages-validate');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')


async function getAll(req, res) {
    let categories = await Categories.getAll(req.query);
    return success(req, res, categories);
}

async function getOne(req, res) {
    let category = await Categories.getByID(req.params.id);
    if (!category) {
        return error(req, res, "Không tìm thấy loại sản phẩm");
    }
    return success(req, res, category);
}

async function create(req, res) {
    let rules = {
        title: ['required'],
        icon: ['required'],
        type: ['required']
    }

    let validate = await Validate(req.body, rules);

    if (validate) {
        return error(req, res, validate);
    }

    const category = await Categories.getOneByParams({ title: req.body.title });
    if (category) {
        return error(req, res, "Loại sản phẩm đã tồn tại");
    }
    const result = await Categories.createData(req.body);
    return success(req, res, result);
    
}

async function update(req, res) {
    // let rules = {
    //     title: ['required'],
    //     icon: ['required'],
    //     type: ['required']
    // }

    // let validate = await Validate(req.body, rules);

    // if (validate) {
    //     return error(req, res, validate);
    // }

    const category = await Categories.getOneByParams({ title: req.body.title });
    if (category) {
        return error(req, res, "Loại sản phẩm đã tồn tại");
    }
    const result = await Categories.updateData(req.params.id, req.body);
    return success(req, res, result);
}

async function deleteOne(req, res) {
    const result = await Categories.deleteOne(req.params.id);
    return success(req, res, result);
}

module.exports = {
    getAll,
    getOne,
    create,
    update,
    deleteOne
}