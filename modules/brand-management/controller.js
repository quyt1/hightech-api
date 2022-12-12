const { success, error } = require('../../helper/response')
const { Brands } = require('../../models')
const Validate = require('../../helper/get-errors-messages-validate');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')


async function getAll(req, res) {
    let brands = await Brands.getAll(req.query);
    return success(req, res, brands);
}

async function getOne(req, res) {
    let brand = await Brands.getByID(req.params.id);
    if (!brand) {
        return error(req, res, "Không tìm thấy thương hiệu");
    }
    return success(req, res, brand);
}

async function create(req, res) {
    let rules = {
        title: ['required'],
        category: ['required']
    }

    let validate = await Validate(req.body, rules);

    if (validate) {
        return error(req, res, validate);
    }

    const brand = await Brands.getOneByParams({ title: req.body.title });
    if (brand) {
        return error(req, res, "Thương hiệu đã tồn tại");
    }
    const result = await Brands.createData(req.body);
    return success(req, res, result);
}
 
async function update(req, res) {
    // let rules = {
    //     title: ['required'],
    //     category: ['required']
    // }

    // let validate = await Validate(req.body, rules);

    // if (validate) {
    //     return error(req, res, validate);
    // }

    const brand = await Brands.getOneByParams({ title: req.body.title });
    if (brand) {
        return error(req, res, "Thương hiệu đã tồn tại");
    }
    const result = await Brands.updateData(req.params.id, req.body);
    return success(req, res, result);
}

async function deleteOne(req, res) {
    const result = await Brands.deleteOne(req.params.id);
    return success(req, res, result);
}

module.exports = {
    getAll,
    getOne,
    create,
    update,
    deleteOne
}