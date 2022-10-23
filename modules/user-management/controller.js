const { success, error } = require('../../helper/response')
const {Users} = require('../../models')
const Validate = require('../../helper/get-errors-messages-validate');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { generateToken, verifyToken } = require('../../helper/jwt.helper');


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
    const result = await Users.createData(req.body);
    return success(req, res, result);
}

async function logout(req, res) {

}

async function getProlile(req, res) {
    const user = await Users.getOneByParams({ _id: req.user.id });
    return success(req, res, user);
}

module.exports = {
    login,
    register,
    logout,
    getProlile
}