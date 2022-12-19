const { success, error } = require('../../helper/response')
const { Coupons } = require('../../models')
const Validate = require('../../helper/get-errors-messages-validate');


async function getAll(req, res) {
    let coupon = await Coupons.getAll(req.query);
    return success(req, res, coupon);
}

async function getOne(req, res) {
    let coupon = await Coupons.getByID(req.params.id);
    if (!coupon) {
        return error(req, res, "Không tìm thấy coupon");
    }
    return success(req, res, coupon);
}

async function checkCode(req, res) {

    let rules = {
        code: ['required']
    }

    let validate = await Validate(req.body, rules);

    if (validate) {
        return error(req, res, validate);
    }

    let coupon = await Coupons.getOneByParams({ code: req.body.code });
    if (!coupon) {
        return error(req, res, "Không tìm thấy coupon");
    }
    if (coupon.quantity <= 0) {
        return error(req, res, "Coupon đã hết số lượng");
    }
    if (coupon.expiredAt < Date.now()) {
        return error(req, res, "Coupon đã hết hạn sử dụng");
    }
    
    return success(req, res, {value : coupon.value});
}

async function create(req, res) {
    let rules = {
        title: ['required'],
        code: ['required'],
        value: ['required'],
        expiredAt: ['required'],
        quantity: ['required'],
    }

    let validate = await Validate(req.body, rules);

    if (validate) {
        return error(req, res, validate);
    }

    const result = await Coupons.createData(req.body);
    return success(req, res, result);
}

async function update(req, res) {
    const result = await Coupons.updateData(req.params.id, req.body);
    return success(req, res, result);
}

async function deleteOne(req, res) {
    const result = await Coupons.deleteOne(req.params.id);
    return success(req, res, result);
}

module.exports = {
    getAll,
    checkCode,
    getOne,
    create,
    update,
    deleteOne
}