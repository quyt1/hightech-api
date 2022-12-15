const { success, error } = require('../../helper/response')
const { Orders, Products, Carts, UserNotifications,AppDevices,Coupons } = require('../../models')
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
const client = mqtt.connect('ws://test.mosquitto.org:8080', options)
//

function getOrderMessage(status){
    switch(status){
        case Constants.ORDER_STATUS.NotProcessed: return "Đơn hàng đã được tiếp nhận";
        case Constants.ORDER_STATUS.Processing: return "Đơn hàng đang được xử lý";
        case Constants.ORDER_STATUS.Shipping: return "Đơn hàng đang được vận chuyển";
        case Constants.ORDER_STATUS.Completed: return "Đơn hàng đã hoàn thành";
        case Constants.ORDER_STATUS.Cancelled: return "Đơn hàng đã bị hủy";
}
}

async function getOrders(req, res) {
    let orders = await Orders.getAll(req.query);
    orders = orders.map(order => {
        order.message = getOrderMessage(order.status);
        return order;
    })
    return success(req, res, orders);
}

async function getMyOrders(req, res) {
    let orders = await Orders.getByUser(req);
    orders = orders.map(order => {
        order.message = getOrderMessage(order.status);
        return order;
    })
    return success(req, res, orders);
}

async function getOneOrder(req, res) {
    let order = await Orders.getOneByParams({_id :  req.params.id});
    order.message = getOrderMessage(order.status);
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
            return error(req, res, "Sản phẩm " + product.title + " không đủ số lượng");
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
    if(req.body.coupon){
        let coupon = await Coupons.getOneByParams({ code: req.body.coupon });
        if(!coupon){
            return error(req, res, "Mã giảm giá không tồn tại");
        }
        if(coupon.quantity <= 0){
            return error(req, res, "Mã giảm giá đã hết lượt sử dụng");
        }
        coupon.quantity = coupon.quantity - 1;
        coupon.used = coupon.used + 1;
        await coupon.save();
    }
    client.publish('highttech-topic', JSON.stringify(result))
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