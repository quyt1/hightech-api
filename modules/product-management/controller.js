const { success, error } = require('../../helper/response')
const { Products, Favorites } = require('../../models')
const Validate = require('../../helper/get-errors-messages-validate');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')


async function getAll(req, res) {
    let rules = {
        type: ['numeric'],
    }

    let validate = await Validate(req.query, rules);

    if (validate) {
        return error(req, res, validate);
    }
    let products = await Products.getAll(req.query);
    let favorites = await Favorites.getAll({ user: req.user.id })
    if (products.data) {
        products.data = await products.data.map(product => {
            product = product.toObject()
            let favorite = favorites.find(favorite => favorite.product.equals(product._id))
            product.favorite = favorite ? true : false
            return product;
        })
    }else{
        products = await products.map(product => {
            let favorite = favorites.find(favorite => favorite.product.equals(product._id))
            product.favorite = favorite ? true : false
            return product;
        })
    }
    return success(req, res, products);
}

async function getOne(req, res) {
    let product = await Products.getByID(req.params.id);
    let favorite = await Favorites.getOneByParams({ user: req.user.id, product: req.params.id }) ? true : false;
    product.favorite = favorite
    if (!product) {
        return error(req, res, "Không tìm thấy loại sản phẩm");
    }
    return success(req, res, product);
}

async function create(req, res) {
    let { body, files } = req;
    let rules = {
        title: ['required'],
        costPrice: ['required'],
        salePrice: ['required'],
        salePercent: ['required'],
        specifications: ['required'],
        category: ['required'],
        brand: ['required'],
    }
    if (!files) {
        rules.images = ['required']
    } else {
        let images = files.map(file => `/images/${file.filename}`)
        body.images = { ...body.images, ...images }
    }

    let validate = await Validate(req.body, rules);

    if (validate) {
        return error(req, res, validate);
    }

    // const product = await Products.getOneByParams({ title: req.body.title });
    // if (product) {
    //     return error(req, res, "Loại sản phẩm đã tồn tại");
    // }
    const result = await Products.createData(req.body);
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

    // const product = await Products.getOneByParams({ title: req.body.title });
    // if (product) {
    //     return error(req, res, "Loại sản phẩm đã tồn tại");
    // }
    const result = await Products.updateData(req.params.id, req.body);
    return success(req, res, result);
}

async function deleteOne(req, res) {
    const result = await Products.deleteOne(req.params.id);
    return success(req, res, result);
}

module.exports = {
    getAll,
    getOne,
    create,
    update,
    deleteOne
}