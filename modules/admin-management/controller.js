const { success, error } = require('../../helper/response')
const {Users} = require('../../models')
const Validate = require('../../helper/get-errors-messages-validate');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { generateToken, verifyToken } = require('../../helper/jwt.helper');
const Constants = require('../../constants');

async function getAllCustomer(req, res) {
    let users = await Users.getAll({role : Constants.USER_TYPE.CUSTOMER});
    return success(req, res, users);
}

async function getAllAdmin(req, res) {
    let users = await Users.getAll({role : Constants.USER_TYPE.Admin});
    return success(req, res, users);
}

async function getOneAdmin(req, res) {
    let user = await Users.getByID(req.params.id);
    if (!user) {
        return error(req, res, "Không tìm thấy người dùng");
    }
    return success(req, res, user);
}

async function createAdmin(req, res) {
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
    let {file} = req
    if (file) {
        console.log(file.filename);
        let image = `https://fpt-hightech-api.herokuapp.com/images/${file.filename}`
        req.body.avatar = image
    } else {
        req.body.avatar = 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png'
    }

    const user = await Users.getOneByParams({ email: req.body.email });
    if (user) {
        return error(req, res, "Email đã tồn tại");
    }
    const hash = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10));
    req.body.password =  hash;
    req.body.role = 'admin';
    const result = await Users.createData(req.body);
    return success(req, res, result);
}

async function updateAdmin(req, res) {
    let {file} = req
    if (file) {
        console.log(file.filename);
        let image = `https://fpt-hightech-api.herokuapp.com/images/${file.filename}`
        req.body.avatar = image
    }
    
    // delete req.body.email
    // delete req.body.password
    if(req.body.password){
        const hash = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10));
        req.body.password =  hash;
    }
    const result = await Users.updateData(req.params.id, req.body);
    return success(req, res, result);
}

async function deleteOneAdmin(req, res) {
    const result = await Users.deleteOne(req.params.id);
    return success(req, res, {});
}

module.exports = {
    getAllAdmin,
    getOneAdmin,
    createAdmin,
    updateAdmin,
    deleteOneAdmin,
    getAllCustomer
}