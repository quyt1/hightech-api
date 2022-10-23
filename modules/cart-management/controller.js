const { success, error } = require('../../helper/response')
const { Carts,Products } = require('../../models')
const Validate = require('../../helper/get-errors-messages-validate');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
let _ = require('lodash');

async function getCart(req, res) {
    let cart = await Carts.getOneByParams({ user: req.user.id });
    if (!cart) {
        return success(req, res, {}, 'Giỏ hàng trống');
    }
    return success(req, res, cart.items);
}

async function addOneProductToCart(req, res) {
    let rules = {
        productId: ['required'],
        quantity: ['required']
    }

    let validate = await Validate(req.body, rules);

    if (validate) {
        return error(req, res, validate);
    }

    let cart = await Carts.getOneByParams({ user: req.user.id });
    if (!cart) {
        let cart = await Carts.createData({
            user: req.user.id,
            items: [{
                product: req.body.productId,
                quantity: req.body.quantity
            }]
        })
        return success(req, res, cart);
    }
    let cartItem = cart.items.find(item => item.product._id == req.body.productId);
    if (cartItem) {
        cartItem.quantity = parseInt(cartItem.quantity) + parseInt(req.body.quantity)
    } else {
        cartItem = {
            product:  await Products.getByID(req.body.productId),
            quantity: req.body.quantity
        }
        cart.items.push(cartItem)
    }
    await cart.save();
    return success(req, res, cartItem);

}

async function addProductsToCart(req, res) {
    let rules = {
        productIds: ['required']
    }

    let validate = await Validate(req.body, rules);

    if (validate) {
        return error(req, res, validate);
    }
     let productIds = _.isString(req.body.productIds) ? JSON.parse(req.body.productIds) : req.body.productIds;
    let cart = await Carts.getOneByParams({ user: req.user.id });
    if (!cart) {
        let cartItems = [];
        productIds.forEach((item) => {
            cartItems.push({
                product: item,
                quantity: 1
            })
        })
        //
        let cart = await Carts.createData({
            user: req.user.id,
            items: cartItems
        })
        return success(req, res, cart);
    }
    
    productIds.forEach(productId => {
        let cartItem = cart.items.find(item => item.product._id == productId);
        if (cartItem) {
            cartItem.quantity = parseInt(cartItem.quantity) + 1
        } else {
            cart.items.push({
                product: productId,
                quantity: 1
            })
        }
    })
    await cart.save();
    return success(req, res, cart);
}

async function updateProductQuantity(req, res) {
    let rules = {
        productId: ['required'],
        quantity: ['required']
    }

    let validate = await Validate(req.body, rules);

    if (validate) {
        return error(req, res, validate);
    }

    let cart = await Carts.getOneByParams({ user: req.user.id });
    if (!cart) {
        return error(req, res, "Giỏ hàng trống");
    }
    console.log(req.body.productId);
    let cartItem = cart.items.find(item => item.product._id == req.body.productId);
    if (!cartItem) {
        return error(req, res, "Không tìm thấy sản phẩm trong giỏ hàng");
    }
    cartItem.quantity = req.body.quantity;
    if (req.body.quantity == 0) {
        cart.items = cart.items.filter(item => item.product._id != req.body.productId);
    }
    await cart.save();
    return success(req, res, cartItem);
}


module.exports = {
    getCart,
    addOneProductToCart,
    addProductsToCart,
    updateProductQuantity
}