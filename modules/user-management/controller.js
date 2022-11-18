const { success, error } = require('../../helper/response')
const {Users,VerifyCodes} = require('../../models')
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


async function login(req, res) {
    let rules = {
        email: ['required', 'email'],
        password: ['required', 'min:6']
    }

    let validate = await Validate(req.body, rules);

    if(validate){
        return error(req, res, validate);
    }

    const { email, password } = req.body;
        const user = await Users.getOneByParams({ email: email });
        if (!user) {
            return error(req, res, "Thông tin đăng nhập không đúng");
        }
        console.log(password);
        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            return error(req, res, "Thông tin đăng nhập không đúng");
        }
        // const token = jwt.sign({ user }, 'secretKey')
        const token = await generateToken(user)
        let result = {
            token: token,
            _id: user._id,
            email: user.email,
            fullname: user.fullname,
            phone: user.phone,
            address: user.address
        }
        return success(req, res,result);
}

async function register(req, res) {
    let rules = {
        email: ['required', 'email'],
        password: ['required', 'min:6'],
        fullname: ['required'],
        phone: ['required']
    }

    let validate = await Validate(req.body, rules);

    if(validate){
        return error(req, res, validate);
    }

    const user = await Users.getOneByParams({ email: req.body.email });
    if (user) {
        return error(req, res, "Email đã tồn tại");
    }
    const hash = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10));
    req.body.password =  hash;
    req.body.role = 'customer';
    const result = await Users.createData(req.body);
    return success(req, res, result);
}

async function logout(req, res) {
    return success(req, res, "Đăng xuất thành công");
}

async function getProlile(req, res) {
    const user = await Users.getOneByParams({ _id: req.user.id });
    return success(req, res, user);
}

async function updateProfile(req, res) {
    const result = await Users.updateData(req.user.id, req.body);
    return success(req, res, result);
}

async function changePassword(req, res) {
    let rules = {
        oldPassword: ['required', 'min:6'],
        newPassword: ['required', 'min:6']
    }

    let validate = await Validate(req.body, rules);

    if(validate){
        return error(req, res, validate);
    }

    const user = await Users.getOneByParams({ _id: req.user.id });
    if (!user) {
        return error(req, res, "Không tìm thấy người dùng");
    }
    console.log(req.body.oldPassword)
    const checkPassword = await bcrypt.compare(req.body.oldPassword, user.password);
    if (!checkPassword) {
        return error(req, res, "Mật khẩu cũ không đúng");
    }
    const hash = await bcrypt.hash(req.body.newPassword, await bcrypt.genSalt(10));
    req.body.password =  hash;
    const result = await Users.updateData(req.user.id, req.body);
    return success(req, res, result);
}

async function forgotPassword(req, res) {
    let rules = {
        email: ['required', 'email'],
    }

    let validate = await Validate(req.body, rules);

    if(validate){
        return error(req, res, validate);
    }

    const user = await Users.getOneByParams({ email: req.body.email });
    if (!user) {
        return error(req, res, "Không tìm thấy người dùng");
    }

    let randomVerifyCode = _.random(1000, 9999);
    let expiredAt = moment().add(15, 'm').format('YYYY-MM-DD HH:mm:ss');
    let dataVerify = {
        user: user,
        type: 1,
        code: randomVerifyCode,
        expiredAt: expiredAt
    };
    let codeExist = await VerifyCodes.getOneByParams({ user: user._id});
    if(codeExist){
        await VerifyCodes.updateData(codeExist._id, dataVerify);
    }else{
        await VerifyCodes.createData(dataVerify);
    }
    sendEmailForgotPassword(user, randomVerifyCode);
    return success(req, res,{user : user._id},"Gửi email thành công");
}

function sendEmailForgotPassword(user, code) {
     let   emailTemplatePath = './../../views/password-reset.html';
  
    //grab email template
    let template = fs.readFileSync(path.join(__dirname, emailTemplatePath), 'utf8');
    template = template.replace('{{ firstName }}', user.fullname);
    template = template.replace('{{ verifyCode }}', code);

    //set params for email
    let params = {};
    params.to = [user.email];
    params.subject = 'HighTech - Reset Password';
    params.htmlContent = template;

    //send to AWS SES
    mailer.sendMail(params);
}

async function verifyCode(req, res) {
    let rules = {
        user: ['required',],
        verifyCode: ['required']
    }

    let validate = await Validate(req.body, rules);
    if(validate){
        return error(req, res, validate);
    }
    let matchCode = await VerifyCodes.getOneByParams({ user: req.body.user, code: req.body.verifyCode});
    if(matchCode){
        if(moment().isAfter(matchCode.expiredAt)){
            return error(req, res, "Mã xác nhận đã hết hạn");
        }
        return success(req, res, {}, "Mã xác nhận hợp lệ");
    }else{
        return error(req, res, "Mã xác nhận không đúng");
    }
}

async function resetPassword(req, res) {
    let rules = {
        user: ['required',],
        verifyCode: ['required'],
        newPassword: ['required', 'min:6']
    }

    let validate = await Validate(req.body, rules);
    if(validate){
        return error(req, res, validate);
    }

    let user = await Users.getByID(req.body.user);
    if(!user){
        return error(req, res, "Không tìm thấy người dùng");
    }

    let matchCode = await VerifyCodes.getOneByParams({ user: req.body.user, code: req.body.verifyCode});
    if(matchCode){
        if(moment().isAfter(matchCode.expiredAt)){
            return error(req, res, "Mã xác nhận đã hết hạn");
        }

        const hash = await bcrypt.hash(req.body.newPassword, await bcrypt.genSalt(10));
        user.password =  hash;
        const result = await Users.updateData(user._id, user);
        return success(req, res, result);
    }else{
        return error(req, res, "Mã xác nhận không đúng");
    }

}

module.exports = {
    login,
    register,
    logout,
    getProlile,
    changePassword,
    updateProfile,
    forgotPassword,
    verifyCode,
    resetPassword
}