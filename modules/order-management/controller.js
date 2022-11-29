const { success, error } = require('../../helper/response')
const { Orders, Products, Carts, UserNotifications,AppDevices } = require('../../models')
const Validate = require('../../helper/get-errors-messages-validate');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
let _ = require('lodash');
const Constants = require('../../constants');
const PushNotification = require('../../helper/push-notification');

//
const mqtt = require('mqtt')
const options = {
    // Clean session
    clean: true,
    connectTimeout: 4000,
    // Auth
    clientId: 'HighTech Server',
    username: 'test',
    password: '123456',
}
const client = mqtt.connect('tcp://smarttech-mqtt-stage.techgel.cloud:1883', options)
//


async function getOrders(req, res) {
    let orders = await Orders.getAll(req.query);
    return success(req, res, orders);
}

async function getMyOrders(req, res) {
    let orders = await Orders.getByUser(req);
    return success(req, res, orders);
}

async function getOneOrder(req, res) {
    let order = await Orders.getOneByParams({_id :  req.params.id});
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
        'shippingAddress.address': ['required'],
        'shippingAddress.city': ['required'],
        'shippingAddress.postalCode': ['required'],
        'shippingAddress.country': ['required'],
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
        } else {
            let soldCount = product.sold ? product.sold : 0
            product.quantity = product.quantity - req.body.items[i].quantity
            product.sold = soldCount + req.body.items[i].quantity
            await product.save()
        }
    }

    const result = await Orders.createData(req.body);
    //Remove product in cart when this product is ordered
    let cart = await Carts.getOneByParams({ user: req.user.id });
    if (cart) {
        for (let i = 0; i < req.body.items.length; i++) {
            let cartItem = cart.items.find(item => item.product._id == req.body.items[i].product);
            if (cartItem) {
                cart.items = cart.items.filter(item => item.product._id != req.body.items[i].product);
            }
        }
        await cart.save();
    }
    client.publish('order', JSON.stringify(result))
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
    const result = await Orders.updateData(req.params.id, req.body);
    //
    let deviceTokens = [];
    let appDevices = await AppDevices.getAll({user : order.user});
    if (appDevices) {
        appDevices.forEach(appDevice => {
            deviceTokens.push(appDevice.deviceToken);
        });
    }
    let notification = await UserNotifications.createData({
        user: order.user,
        title: "Đơn hàng #" + order.id + " đã được cập nhật",
        description: "Đơn hàng #" + order.id + " đã được cập nhật thành trạng thái " + req.body.status,
        information: {
            order: order._id
        }
    });
    if (deviceTokens.length > 0) {
        await PushNotification.sendPushNotification({
            notification: {
                title: notification.title,
                body: notification.description,
                data: notification.information
            },
            data: notification.information,
            deviceToken: deviceTokens
        });
    }
    //
    return success(req, res, result);
}


module.exports = {
    getOrders,
    getMyOrders,
    getOneOrder,
    createOrder,
    updateOrder
}