const { success, error } = require('../../helper/response')
const { Orders,Products } = require('../../models')
const Validate = require('../../helper/get-errors-messages-validate');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
let _ = require('lodash');
const Constants = require('../../constants');



async function getOrders(req, res) {
    let orders = await Orders.getAll(req.query);
    return success(req, res, orders);
}

async function getMyOrders(req, res) {
    let orders = await Orders.getByUser(req);
    return success(req, res, orders);
}

async function getOneOrder(req, res) {
    let order = await Orders.getByID(req.params.id);
    if (!order) {
        return error(req, res, "Không tìm thấy đơn hàng");
    }
    return success(req, res, order);
}

async function createOrder(req, res) {
    let rules = {
        items: ['required'],
        'items.*.product': ['required'],
        'items.*.quantity': ['required'],
        totalPrice: ['required'],
        paymentMethod: ['required'],
        shippingAddress: ['required'],
        'shippingAddress.address' : ['required'],
        'shippingAddress.city' : ['required'],
        'shippingAddress.postalCode' : ['required'],
        'shippingAddress.country' : ['required'],
        phone: ['required'],
    }

    let validate = await Validate(req.body, rules);

    if (validate) {
        return error(req, res, validate);
    }
    req.body.user = req.user.id;
    for (let i = 0; i < req.body.items.length; i++) {
        let product = await Products.getByID(req.body.items[i].product);
        if (product.quantity < req.body.items[i].quantity) {
            return error(req, res, "Sản phẩm " + product.name + " không đủ số lượng");
        }else{
            await Products.updateData(product.id,{quantity: product.quantity - req.body.items[i].quantity});
        }
    }

    const result = await Orders.createData(req.body);
    return success(req, res, result);
    
}

async function updateOrder(req, res) {
    let rules = {
        status: ['required', 'in:Not Processed,Processing,Shipping,Completed,Cancelled'],
    }

    let validate = await Validate(req.body, rules);

    if (validate) {
        return error(req, res, validate);
    }

    const order = await Orders.getByID(req.params.id);
    if (!order) {
        return error(req, res, "Đơn hàng không tồn tại");
    }
    const result = await Orders.updateData(req.params.id,req.body);
    return success(req, res, result);
    
}


module.exports = {
    getOrders,
    getMyOrders,
    getOneOrder,
    createOrder,
    updateOrder
}