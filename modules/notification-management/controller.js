const { success, error } = require('../../helper/response')
const { Users, VerifyCodes } = require('../../models')
const Validate = require('../../helper/get-errors-messages-validate');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { generateToken, verifyToken } = require('../../helper/jwt.helper');
const Constants = require('../../constants');
const _ = require('lodash');
const moment = require('moment');
const fs = require('fs');
const path = require('path');
const i18next = require('i18next');
const mailer = require('../../utils/mailer');
const PushNotification = require('../../helper/push-notification');

async function pushNotification(req, res) {
    proessQueueSendNotification(req.params.deviceToken);
    return success(req, res, {}, "Push notification successfully");
}

async function proessQueueSendNotification(deviceToken) {
    await PushNotification.sendPushNotification({
        notification: {
            title:"Server Notification",
            body: 'This is a notification from server',
            data: {
                test : "test"
            }
        },
        data: {
            test : "test"
        },
        // deviceToken: 'dSEfuUoiTxCuykFhZY-NP_:APA91bHjxIFnyPe8UxNZXNwNVzdawfo-yYbPFgAamLO7u1pXEkL7wBrMycIqT8ICdyawj_oSsqujigigwd-zniwsqBdSEAwsQb1UGzCOJ3E6LYswRQSNZNdhhladfCXpeEMFvT5mGL9m',
        deviceToken : deviceToken
    });
}

module.exports = {
    pushNotification,
}